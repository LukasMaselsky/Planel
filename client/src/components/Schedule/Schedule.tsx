import { useState } from "react";
import ScheduleItem from "./ScheduleItem";
import AddSlot from "./AddSlot";
import { useQuery } from "react-query";

type Day = "M" | "T" | "W" | "F" | "S";

export const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

export interface Schedule {
    day: string;
    alias: Day;
    classes?: {
        name: string;
        time: string;
        length: number; // hours
        color: string;
        location: string;
    }[];
}

export default function Schedule() {
    const [selectedDay, setSelectedDay] = useState<string>("Monday");
    const [addSlotOpen, setAddSlotOpen] = useState(false);

    const cancel = () => [setAddSlotOpen(false)];

    const initialSchedule: Schedule[] = [
        {
            day: "Monday",
            alias: "M",
            classes: [
                {
                    name: "maths",
                    time: "12:00",
                    length: 1,
                    color: "red",
                    location: "building 1",
                },
            ],
        },
        {
            day: "Tuesday",
            alias: "T",
        },
        {
            day: "Wednesday",
            alias: "W",
        },
        {
            day: "Thursday",
            alias: "T",
        },
        {
            day: "Friday",
            alias: "F",
        },
        {
            day: "Saturday",
            alias: "S",
        },
        {
            day: "Sunday",
            alias: "S",
        },
    ];

    const getSchedule = () => {
        let schedule = localStorage.getItem("schedule");
        if (schedule) {
            return JSON.parse(schedule);
        }
        return initialSchedule;
    };

    const updateSchedule = () => {};

    const { data, isLoading, error, refetch } = useQuery({
        queryFn: getSchedule,
        queryKey: ["schedule"],
        staleTime: Infinity,
        cacheTime: 0,
    });

    if (isLoading) return <div>Loading</div>;

    if (error) return <div>Error</div>;

    return (
        <div className="relative flex h-[400px] w-[300px] flex-col gap-2 rounded-lg border-[1px] border-black p-1">
            <div className="flex w-full">
                {initialSchedule.map((day, i: number) => (
                    <div
                        key={i}
                        onClick={() => setSelectedDay(day.day)}
                        className={
                            "flex w-[calc(100%/7)] items-center justify-center hover:cursor-pointer " +
                            (selectedDay == day.day ? "underline" : "")
                        }
                    >
                        {day.alias}
                    </div>
                ))}
            </div>

            {data &&
                data
                    .filter((day: Schedule) => day.day == selectedDay)
                    .map((day: Schedule, i: number) => {
                        return (
                            <ScheduleItem
                                key={i}
                                day={day.day}
                                alias={day.alias}
                                classes={day.classes}
                            />
                        );
                    })}

            {addSlotOpen ? <AddSlot cancel={cancel} /> : null}

            <div className="flex w-full justify-center">
                <button onClick={() => setAddSlotOpen(true)}>Add slot</button>
            </div>
        </div>
    );
}
