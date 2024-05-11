import { useState, useContext } from "react";
import { ActivityContext } from "../../context/activityContext";
import {
    stringToDate,
    dateAddition,
    dateToString,
    monthDigitsToWord,
    dayWithSuffix,
    getDayDiff,
} from "../../utils/date";
import { ActivityType } from "../../context/activityContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import { getTheme } from "../../utils/getTheme";

const getGraphData = (
    data: ActivityType[] | undefined,
    startIndex: number,
    interval: number,
    setDateRange: React.Dispatch<React.SetStateAction<string>>,
) => {
    if (!data) return {};
    if (data && data.length == 0) return {};

    // get start point of x axis
    const firstDate = data[0].date;
    const startDate = dateAddition(stringToDate(firstDate), startIndex);

    const newData: Record<string, number> = {};
    // copy freq count including missing dates with freq = 0
    for (let i = 0; i < interval; i++) {
        const nextDate = dateAddition(startDate, i);
        const nextDateStr = dateToString(nextDate);
        newData[nextDateStr] = 0;
    }

    setDateRange(handleDateRangeChange(Object.keys(newData))); // update top that shows month and year range

    data.forEach((obj) => {
        const { date } = obj;
        if (date in newData) {
            newData[date] = newData[date] + 1;
        }
    });

    return newData;
};

const handleDateRangeChange = (dates: string[]) => {
    const firstMonth = monthDigitsToWord(dates[0].slice(3, 5));
    const lastMonth = monthDigitsToWord(dates[dates.length - 1].slice(3, 5));

    const firstYear = dates[0].slice(6, 10);
    const lastYear = dates[dates.length - 1].slice(6, 10);

    if (firstMonth == lastMonth && firstYear == lastYear) {
        return `${firstMonth} ${firstYear}`;
    } else {
        return `${firstMonth} ${firstYear} - ${lastMonth} ${lastYear}`;
    }
};

export default function ActivityGraph() {
    const [startIndex, setStartIndex] = useState(0);
    const [interval, setInterval] = useState(7); // 1 week
    const [graphType, setGraphType] = useState<"bar" | "line">("line");
    const [dateRange, setDateRange] = useState("");

    const handleForwardClick = () => {
        setStartIndex((prev) => prev + interval);
    };

    const handleBackwardClick = () => {
        setStartIndex((prev) => (prev - interval < 0 ? 0 : prev - interval));
    };

    return (
        <div className="size-[400px]">
            <div className="flex items-center justify-between p-2">
                <div className="flex gap-2">
                    <select className="rounded-lg bg-bg-vis px-2 py-1 text-text">
                        <option onClick={() => setInterval(7)}>Week</option>
                        <option onClick={() => setInterval(30)}>Month</option>
                    </select>
                    <select className="rounded-lg bg-bg-vis px-2 py-1 text-text">
                        <option onClick={() => setGraphType("line")}>
                            Line
                        </option>
                        <option onClick={() => setGraphType("bar")}>Bar</option>
                    </select>
                </div>
                <div>
                    <p>{dateRange}</p>
                </div>
                <div className="flex gap-2">
                    <FontAwesomeIcon
                        className="cursor-pointer text-2xl text-text"
                        onClick={handleBackwardClick}
                        icon={faAngleLeft}
                    />
                    <FontAwesomeIcon
                        className="cursor-pointer text-2xl text-text"
                        onClick={handleForwardClick}
                        icon={faAngleRight}
                    />
                </div>
            </div>
            <div className="flex h-full">
                <ActivityGraphWrapper
                    startIndex={startIndex}
                    interval={interval}
                    graphType={graphType}
                    width={400}
                    height={400}
                    setDateRange={setDateRange}
                />
            </div>
        </div>
    );
}

type GraphWrapperProps = {
    startIndex: number;
    interval: number;
    graphType: "bar" | "line";
    width: number;
    height: number;
    setDateRange: React.Dispatch<React.SetStateAction<string>>;
};

function ActivityGraphWrapper(props: GraphWrapperProps) {
    const labelColor = getTheme("text");
    const primary = getTheme("primary");

    const activity = useContext(ActivityContext);

    const { data, isLoading, error } = useQuery({
        queryFn: () =>
            getGraphData(
                activity?.completed,
                props.startIndex,
                props.interval,
                props.setDateRange,
            ),
        queryKey: ["graph-data", activity, props.startIndex, props.interval],
        staleTime: Infinity,
        cacheTime: 0,
    });

    if (isLoading) return <div></div>;

    if (error) return <div>Error</div>;

    if (!data) return <div>No data</div>;

    const labelSize = Math.min(props.width, props.height) / 20;
    const innerHeight = props.height - labelSize; // size of x and y axis line
    const innerWidth = props.width - labelSize;

    const values = Object.values(data);
    const keys = Object.keys(data);
    const dataLength = keys.length;

    const maxValue = Math.max(5, ...values) + 1; // +1 to leave gap at top

    const yCoords: number[] = [];
    // TODO: swap ygap spacing interval calculation thingy
    const ygap = (props.height - labelSize) / maxValue;
    for (let i = 0; i < maxValue; i++) {
        yCoords.push(ygap * (maxValue - i));
    }

    const xCoords: number[] = [];
    let linePath = "";
    const xgap = innerWidth / dataLength;
    if (props.graphType == "line") {
        for (let i = 0; i < dataLength; i++) {
            xCoords.push(labelSize + xgap * i);
        }

        linePath = `M${xCoords[0]},${yCoords[values[0]]}`;
        for (let i = 1; i < dataLength; i++) {
            linePath = linePath + `L${xCoords[i]},${yCoords[values[i]]}`;
        }
    } else {
        for (let i = 0; i < dataLength; i++) {
            xCoords.push(labelSize + xgap / 2 + xgap * i); // same as line but with (- gap / 2)
        }
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
                transform={`translate(0, ${innerHeight})`}
                textAnchor="middle"
                fontSize="10"
            >
                <path
                    d={`M${labelSize},0H${props.width}`}
                    stroke={labelColor}
                ></path>
                {keys.map((date, i) => (
                    <g
                        key={i}
                        opacity="1"
                        transform={`translate(${xCoords[i]},0)`}
                    >
                        <line stroke={labelColor} y2="6"></line>
                        <text fill={labelColor} y="9" dy="0.5rem">
                            {props.interval <= 7
                                ? dayWithSuffix(date.slice(0, 2))
                                : date.slice(0, 2)}
                        </text>
                    </g>
                ))}
            </g>
            <g fill="none" textAnchor="middle" fontSize="10">
                <path
                    d={`M${labelSize},0V${innerHeight}`}
                    stroke={labelColor}
                ></path>
                {[...Array(maxValue)].map((_, i) => (
                    <g
                        key={i}
                        opacity="1"
                        transform={`translate(${labelSize - 6},${yCoords[i]})`}
                    >
                        <line stroke={labelColor} x2="6"></line>
                        <text fill={labelColor} x="0" y="3" dx="-0.5rem">
                            {i}
                        </text>
                    </g>
                ))}
            </g>
            {props.graphType == "line" ? (
                <ActivityLineGraph graphColor={primary} linePath={linePath} />
            ) : (
                <ActivityBarGraph
                    graphColor={primary}
                    xCoords={xCoords}
                    yCoords={yCoords}
                    innerHeight={innerHeight}
                    gap={xgap}
                    values={values}
                />
            )}
        </svg>
    );
}

type LineGraphProps = {
    graphColor: string;
    linePath: string;
};

function ActivityLineGraph(props: LineGraphProps) {
    return (
        <path
            fill="none"
            stroke={props.graphColor}
            strokeWidth={1.5}
            d={props.linePath}
        ></path>
    );
}

type BarGraphProps = {
    graphColor: string;
    xCoords: number[];
    yCoords: number[];
    innerHeight: number;
    values: number[];
    gap: number;
};

function ActivityBarGraph(props: BarGraphProps) {
    const space = props.gap / 10;

    return (
        <>
            {props.xCoords.map((xCoord, i) => (
                <rect
                    x={xCoord - props.gap / 2 + space}
                    y={props.yCoords[props.values[i]]}
                    width={props.gap - space * 2}
                    height={props.innerHeight - props.yCoords[props.values[i]]}
                    fill={props.graphColor}
                ></rect>
            ))}
        </>
    );
}
