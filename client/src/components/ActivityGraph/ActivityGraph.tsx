import { useState, useContext, useEffect } from "react";
import { ActivityContext } from "../../context/activityContext";
import { stringToDate, dateAddition, dateToString } from "../../utils/date";
import { ActivityType } from "../../context/activityContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";

const getGraphData = (
    data: ActivityType[] | undefined,
    startIndex: number,
    interval: number,
) => {
    if (!data) return {};

    const frequencyCounter: Record<string, number> = {};
    data.forEach((obj) => {
        const { date } = obj;
        frequencyCounter[date] = (frequencyCounter[date] || 0) + 1;
    });

    // get start point of x axis
    const firstDate = data[0].date;
    const startDate = dateAddition(stringToDate(firstDate), startIndex);

    const newData: Record<string, number> = {};
    // copy freq count including missing dates with freq = 0
    for (let i = 0; i < interval; i++) {
        const nextDate = dateAddition(startDate, i);
        const nextDateStr = dateToString(nextDate);

        if (nextDateStr in frequencyCounter) {
            newData[nextDateStr] = frequencyCounter[nextDateStr]; // copy freq
        } else {
            // no activity on this day
            newData[nextDateStr] = 0;
        }
    }

    return newData;
};

export default function ActivityGraph() {
    const [startIndex, setStartIndex] = useState(0);
    const [interval, setInterval] = useState(7); // 1 week

    const activity = useContext(ActivityContext);

    const { data, isLoading, error, refetch } = useQuery({
        queryFn: () => getGraphData(activity?.completed, startIndex, interval),
        queryKey: ["graph-data", startIndex, interval],
        staleTime: Infinity,
        cacheTime: 0,
    });

    const handleForwardClick = () => {
        setStartIndex((prev) => prev + interval);
    };

    const handleBackwardClick = () => {
        setStartIndex((prev) => (prev - interval < 0 ? 0 : prev - interval));
    };

    if (isLoading) return <div>Loading</div>;

    if (error) return <div>Error</div>;

    if (!data) return <div>No data</div>;

    return (
        <div className="size-[400px]">
            <div className="flex items-center justify-between px-2 py-1">
                <select className="px-2 py-1">
                    <option onClick={() => setInterval(7)}>Week</option>
                    <option onClick={() => setInterval(30)}>Month</option>
                </select>
                <div className="flex gap-2">
                    <FontAwesomeIcon
                        className="cursor-pointer text-2xl"
                        onClick={handleBackwardClick}
                        icon={faAngleLeft}
                    />
                    <FontAwesomeIcon
                        className="cursor-pointer text-2xl"
                        onClick={handleForwardClick}
                        icon={faAngleRight}
                    />
                </div>
            </div>
            <div className="flex h-full">
                <ActivityLineGraph
                    width={400}
                    height={400}
                    labelColor={"black"}
                    graphColor={"steelblue"}
                    data={data}
                />
            </div>
        </div>
    );
}

type ActivityLineGraphProps = {
    width: number;
    height: number;
    labelColor: string;
    graphColor: string;
    data: Record<string, number>;
};

function ActivityLineGraph(props: ActivityLineGraphProps) {
    const labelSize = Math.min(props.width, props.height) / 20;
    const dataLength = Object.keys(props.data).length;

    const values = Object.values(props.data);
    const keys = Object.keys(props.data);

    const maxValue = Math.max(5, ...values) + 1; // +1 to leave gap at top

    const xCoords: number[] = [];
    for (let i = 0; i < values.length; i++) {
        xCoords.push(labelSize + (props.width / dataLength) * i);
    }

    const yCoords: number[] = [];
    const gap = (props.height - labelSize) / maxValue;
    for (let i = 0; i < maxValue; i++) {
        yCoords.push(gap * (maxValue - i));
    }

    let linePath = `M${xCoords[0]},${yCoords[values[0]]}`;
    for (let i = 1; i < values.length; i++) {
        linePath = linePath + `L${xCoords[i]},${yCoords[values[i]]}`;
    }

    return (
        <svg
            width={props.width}
            height={props.height}
            viewBox={`0,0,${props.width},${props.height}`}
            className="h-auto max-w-full"
        >
            <g
                fill="none"
                transform={`translate(0, ${props.height - labelSize})`}
                textAnchor="middle"
                fontSize="10"
            >
                <path
                    d={`M${labelSize},0H${props.width}`}
                    stroke={props.labelColor}
                ></path>
                {keys.map((date, i) => (
                    <g opacity="1" transform={`translate(${xCoords[i]},0)`}>
                        <line stroke={props.labelColor} y2="6"></line>
                        <text fill={props.labelColor} y="9" dy="0.5rem">
                            {date.slice(0, 2)}
                        </text>
                    </g>
                ))}
            </g>
            <g fill="none" textAnchor="middle" fontSize="10">
                <path
                    d={`M${labelSize},0V${props.height - labelSize}`}
                    stroke={props.labelColor}
                ></path>
                {[...Array(maxValue)].map((_, i) => (
                    <g
                        opacity="1"
                        transform={`translate(${labelSize - 6},${yCoords[i]})`}
                    >
                        <line stroke={props.labelColor} x2="6"></line>
                        <text fill={props.labelColor} x="0" y="3" dx="-0.5rem">
                            {i}
                        </text>
                    </g>
                ))}
            </g>
            <path
                fill="none"
                stroke={props.graphColor}
                strokeWidth={1.5}
                d={linePath}
            ></path>
        </svg>
    );
}
