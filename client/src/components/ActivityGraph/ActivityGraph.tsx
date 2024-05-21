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
import { getPrimaryColor, getTextColor } from "../../utils/getTheme";
import { getItem } from "../../utils/localStorage";
import Loading from "../Loading";
import { motion } from "framer-motion";
import Error from "../Error";
import OrganiseWrapper from "../OrganiseWrapper";
import Empty from "../Empty";

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

const shiftGraphToCurrentDate = () => {
    const activity: ActivityType[] = getItem("activity");
    if (activity.length == 0) return 0;

    const startDate = stringToDate(activity[0].date);
    const diff = getDayDiff(startDate, new Date());
    return diff > 7 ? diff - 7 : diff; //* -7 to see past week of activity
};

export default function ActivityGraph() {
    const [startIndex, setStartIndex] = useState(shiftGraphToCurrentDate());
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
        <div className="h-full w-[400px] p-2">
            <div className="flex items-center justify-between gap-2 p-2">
                <div className="flex gap-2 text-base">
                    <select className="rounded-lg bg-bg-vis px-2 py-2 text-text">
                        <option onClick={() => setInterval(7)}>Week</option>
                        <option onClick={() => setInterval(30)}>Month</option>
                    </select>
                    <select className="rounded-lg bg-bg-vis px-2 py-2 text-text">
                        <option onClick={() => setGraphType("line")}>
                            Line
                        </option>
                        <option onClick={() => setGraphType("bar")}>Bar</option>
                    </select>
                </div>
                <div>
                    <p className="text-nowrap">{dateRange}</p>
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
            <div className="flex">
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

const translateDecimal = (num: number) => {
    let translation = 1;
    if (num == 0.1) {
        translation = 0.1;
    } else if (num <= 0.2) {
        translation = 0.2;
    } else if (num <= 0.25) {
        translation = 0.25;
    } else if (num <= 0.3) {
        translation = 0.3;
    } else if (num <= 0.4) {
        translation = 0.4;
    } else if (num <= 0.5) {
        translation = 0.5;
    } else if (num <= 0.6) {
        translation = 0.6;
    } else if (num <= 0.7) {
        translation = 0.7;
    } else if (num <= 0.75) {
        translation = 0.75;
    } else if (num <= 0.8) {
        translation = 0.8;
    } else if (num <= 0.9) {
        translation = 0.9;
    } else if (num <= 1) {
        translation = 1;
    }
    return translation;
};

const calculateMaxAndInterval = (trueMax: number, numOfLabels: number) => {
    if (trueMax <= numOfLabels) {
        return [trueMax, 1];
    }
    /* num of labels excludes 0 */
    // e.g. 219
    let tick = trueMax / numOfLabels; // tick = 21.9
    const power = String(Math.floor(tick)).length; // 2
    const tenToPower = Math.pow(10, power); // 10^2
    const decimal = tick / tenToPower;
    let interval = translateDecimal(decimal);
    interval = Math.ceil(interval * tenToPower); // ceil to get rid of decimal

    const max = interval * numOfLabels;
    console.log(max, interval);

    return [max, interval];
};

const calculateYLabels = (
    max: number,
    interval: number,
    numOfLabels: number,
    yCoords: number[],
) => {
    if (max <= 10) {
        // no scaling / weird shit needed
        const yLabels: number[] = [...Array(max + 1)].map((_, i) => i);
        const yLabelCoords: number[] = yCoords;

        return { yLabels, yLabelCoords };
    }

    const yLabels: number[] = [...Array(numOfLabels + 1)].map(
        (_, i) => i * interval,
    );
    const yLabelCoords = yCoords.filter((_, i) => i % interval == 0);

    return { yLabels, yLabelCoords };
};

function ActivityGraphWrapper(props: GraphWrapperProps) {
    const labelColor = getTextColor();
    const primary = getPrimaryColor();

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

    if (isLoading)
        return (
            <OrganiseWrapper
                width={`${props.width}px`}
                height={`${props.height}px`}
                border={false}
            >
                <Loading />
            </OrganiseWrapper>
        );

    if (error)
        return (
            <OrganiseWrapper
                width={`${props.width}px`}
                height={`${props.height}px`}
                border={false}
            >
                <Error />
            </OrganiseWrapper>
        );

    if (!data) return <div>No data</div>;

    const labelSize = Math.min(props.width, props.height) / 20;
    const innerHeight = props.height - labelSize; // size of x and y axis line
    const innerWidth = props.width - labelSize;

    const values = Object.values(data);
    const keys = Object.keys(data);

    if (keys.length == 0)
        return (
            <OrganiseWrapper
                width={`${props.width}px`}
                height={`${props.height}px`}
                border={false}
            >
                <Empty component="activity" index={0} />
            </OrganiseWrapper>
        );

    const dataLength = keys.length;

    let maxValue = Math.max(5, ...values);
    const numOfLabels = 10;
    const [max, interval] = calculateMaxAndInterval(maxValue, numOfLabels);
    maxValue = max + interval; // + interval to leave gap on top

    //* since different number division causes labels to not be alligned with coords
    //* get all y coord points first and base labels on those
    const yCoords: number[] = [];
    const ygap = (props.height - labelSize) / maxValue;
    for (let i = 0; i < maxValue; i++) {
        yCoords.push(ygap * (maxValue - i));
    }

    const { yLabels, yLabelCoords } = calculateYLabels(
        max,
        interval,
        numOfLabels,
        yCoords,
    );

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
                {yLabels.map((label, i) => (
                    <g
                        key={i}
                        opacity="1"
                        transform={`translate(${labelSize - 6},${yLabelCoords[i]})`}
                    >
                        <line stroke={labelColor} x2="6"></line>
                        <text fill={labelColor} x="0" y="3" dx="-0.5rem">
                            {label}
                        </text>
                    </g>
                ))}
            </g>
            {props.graphType == "line" ? (
                <ActivityLineGraph
                    graphColor={primary}
                    linePath={linePath}
                    interval={props.interval}
                />
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
    interval: number;
};

function ActivityLineGraph(props: LineGraphProps) {
    return (
        <motion.path
            fill="none"
            stroke={props.graphColor}
            strokeWidth={1.5}
            d={props.linePath}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: props.interval * 0.1 }}
        ></motion.path>
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
                <motion.rect
                    x={xCoord - props.gap / 2 + space}
                    y={props.yCoords[props.values[i]]}
                    width={props.gap - space * 2}
                    height={props.innerHeight - props.yCoords[props.values[i]]}
                    fill={props.graphColor}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{ duration: 1 }}
                ></motion.rect>
            ))}
        </>
    );
}
