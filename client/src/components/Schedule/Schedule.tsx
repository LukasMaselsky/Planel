import { useState } from "react";
import ScheduleItem from "./ScheduleItem";
import AddSlot from "./AddSlot";
import { useQuery } from "react-query";
import { Values } from "./AddSlot";

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
        id: number;
        name: string;
        startTime: string;
        endTime: string;
        color: string;
        location: string;
    }[];
}

export default function Schedule() {
    const [selectedDay, setSelectedDay] = useState<string>("Monday");
    const [addSlotOpen, setAddSlotOpen] = useState(false);

    const closeAddSlot = () => {
        setAddSlotOpen(false);
    };

    const initialSchedule: Schedule[] = [
        {
            day: "Monday",
            alias: "M",
            classes: [
                {
                    id: 1,
                    name: "maths",
                    startTime: "12:00",
                    endTime: "13:00",
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

    const updateSchedule = (data: Values) => {
        let schedule: Schedule[] = getSchedule();
        const slots = schedule.find((slots) => slots.day == data.day);

        const startTime = `${data.startTimeHour}:${data.startTimeMinute}`;
        const endTime = `${data.endTimeHour}:${data.endTimeMinute}`;
        const clone = (({
            startTimeHour,
            startTimeMinute,
            endTimeHour,
            endTimeMinute,
            ...o
        }) => o)(data); // remove hours and minutes

        let id;
        let newSlot;
        if (slots) {
            if (slots.classes) {
                id = slots.classes[slots.classes.length - 1].id + 1;

                newSlot = {
                    ...clone,
                    id: id,
                    color: "red",
                    startTime: startTime,
                    endTime: endTime,
                };

                slots.classes = [...slots.classes, newSlot];
            } else {
                id = 1;
                newSlot = {
                    ...clone,
                    id: id,
                    color: "red",
                    startTime: startTime,
                    endTime: endTime,
                };

                slots.classes = [newSlot];
            }
        }

        //! figure out some way to check if new slot overlaps with an existing slot

        localStorage.setItem("schedule", JSON.stringify(schedule));
        refetch(); // manually call react query refresh
    };

    const deleteSlot = () => {};

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

            {addSlotOpen ? (
                <AddSlot close={closeAddSlot} updateSchedule={updateSchedule} />
            ) : null}

            <div className="flex w-full justify-center">
                <button onClick={() => setAddSlotOpen(true)}>Add slot</button>
            </div>
        </div>
    );
}

//! sort the data by start time
