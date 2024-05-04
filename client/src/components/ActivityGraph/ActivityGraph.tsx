import { useState, useContext, useEffect } from "react";
import { ActivityContext } from "../../context/activityContext";
import { stringToDate, dateAddition, dateToString } from "../../utils/date";
import { ActivityType } from "../../context/activityContext";

export default function ActivityGraph() {
    const [startIndex, setStartIndex] = useState(0);
    const [interval, setInterval] = useState(7); // 1 week
    const [graphData, setGraphData] = useState<Record<string, number>>({});

    const activity = useContext(ActivityContext);
    let data: ActivityType[] = [];

    // TODO: get rid of this stupid
    useEffect(() => {
        if (activity) {
            data = activity.completed;
        }
    }, [activity]);

    useEffect(() => {
        setGraphData(getGraphData(data, startIndex, interval));
    }, [startIndex, interval]);

    return (
        <div className="h-80 w-80">
            <div className="flex"></div>
            <div className="flex h-full">
                <ActivityLineGraph
                    width={320}
                    height={320}
                    labelColor={"black"}
                    data={graphData}
                />
            </div>
        </div>
    );
}

const getGraphData = (
    data: ActivityType[],
    startIndex: number,
    interval: number,
) => {
    if (data.length == 0) return {};

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

type ActivityLineGraphProps = {
    width: number;
    height: number;
    labelColor: string;
    data: Record<string, number>;
};

function ActivityLineGraph(props: ActivityLineGraphProps) {
    const labelSize = Math.min(props.width, props.height) / 20;

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
            </g>
            <g fill="none" textAnchor="middle" fontSize="10">
                <path
                    d={`M${labelSize},0V${props.height - labelSize}`}
                    stroke={props.labelColor}
                ></path>
            </g>
        </svg>
    );
}
