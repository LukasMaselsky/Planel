import { useState } from "react";
import ScheduleItem from "./ScheduleItem";
import AddSlot from "./AddSlot";
import { useQuery } from "react-query";
import { ScheduleValues } from "./AddSlot";
import { getItem } from "../../utils/localStorage";

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

type ArrayElement<T> = T extends (infer U)[] ? U : never;
type ClassType = ArrayElement<Schedule["classes"]>;

type Props = {
    width: string;
    height: string;
};

export default function Schedule({ width, height }: Props) {
    const [selectedDay, setSelectedDay] = useState<string>("Monday");
    const [addSlotOpen, setAddSlotOpen] = useState(false);

    const closeAddSlot = () => {
        setAddSlotOpen(false);
    };

    const initialSchedule: Schedule[] = [
        {
            day: "Monday",
            alias: "M",
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

    const strToDate = (str: string): Date => {
        return new Date(
            0,
            0,
            0,
            Number(str.slice(0, 2)),
            Number(str.slice(3, 5)),
        );
    };

    const checkScheduleOverlap = (
        newStartTime: string,
        newEndTime: string,
        oldSlotTimes: { startTime: string; endTime: string }[],
    ): boolean => {
        const newStartTimeDate = strToDate(newStartTime);
        const newEndTimeDate = strToDate(newEndTime);

        for (let i = 0; i < oldSlotTimes.length; i++) {
            const oldStartTimeDate = strToDate(oldSlotTimes[i].startTime);
            const oldEndTimeDate = strToDate(oldSlotTimes[i].endTime);

            if (
                newEndTimeDate > oldStartTimeDate &&
                newEndTimeDate < oldEndTimeDate
            )
                return true;

            if (
                newStartTimeDate > oldStartTimeDate &&
                newStartTimeDate < oldEndTimeDate
            )
                return true;

            if (
                newStartTimeDate <= oldStartTimeDate &&
                newEndTimeDate >= oldEndTimeDate
            )
                return true;
        }

        return false;
    };

    // TODO: don't close add slot if overlap

    const updateSchedule = (data: ScheduleValues): boolean => {
        let schedule: Schedule[] = getItem("schedule");
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
                //* check if new slot overlaps with an existing slot
                const oldSlotTimes = slots.classes.map(
                    ({ startTime, endTime }) => ({
                        startTime,
                        endTime,
                    }),
                );

                if (checkScheduleOverlap(startTime, endTime, oldSlotTimes))
                    return false;

                id =
                    slots.classes.length > 0
                        ? slots.classes[slots.classes.length - 1].id + 1
                        : 1;

                newSlot = {
                    ...clone,
                    id: id,
                    startTime: startTime,
                    endTime: endTime,
                };

                slots.classes = [...slots.classes, newSlot];
            } else {
                id = 1;
                newSlot = {
                    ...clone,
                    id: id,
                    startTime: startTime,
                    endTime: endTime,
                };

                slots.classes = [newSlot];
            }

            slots.classes.sort(sortClasses());
        }

        localStorage.setItem("schedule", JSON.stringify(schedule));
        refetch(); // manually call react query refresh
        return true;
    };

    const deleteSlot = (id: number, day: string) => {
        let schedule: Schedule[] = getItem("schedule");
        const slots = schedule.find((slots) => slots.day == day);

        if (slots) {
            if (slots.classes) {
                let newClasses = slots.classes.filter((c) => c.id != id);
                slots.classes = newClasses;
            }
        }

        localStorage.setItem("schedule", JSON.stringify(schedule));
        //! add delay/animation here
        setTimeout(function () {
            refetch();
        }, 500);
    };

    const sortClasses = () => {
        return function (a: ClassType, b: ClassType): number {
            const dateA = strToDate(a.startTime);
            const dateB = strToDate(b.startTime);
            return Number(dateA) - Number(dateB);
        };
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryFn: () => getItem("schedule"),
        queryKey: ["schedule"],
        staleTime: Infinity,
        cacheTime: 0,
    });

    if (isLoading) return <div>Loading</div>;

    if (error) return <div>Error</div>;

    return (
        <div
            className="relative flex flex-col gap-2 rounded-lg border-[1px] border-text p-1 text-text"
            style={{ width: width, height: height }}
        >
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
                                classes={day.classes}
                                deleteSlot={deleteSlot}
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

// TODO: sort the data by start time
