import { useState, useContext } from "react";
import ScheduleDay from "./ScheduleDay";
import AddSlot from "./AddSlot";
import { useQuery } from "react-query";
import { ScheduleValues } from "./AddSlot";
import { getItem } from "../../utils/localStorage";
import { ClassesContext } from "../../context/classesContext";
import OrganiseWrapper from "../OrganiseWrapper";
import Loading from "../Loading";
import Error from "../Error";
import Empty from "../Empty";

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
    const classes = useContext(ClassesContext);

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
            if (classes) {
                classes.addClass(data.name);
            }
            slots.classes.sort(sortClasses());
        }

        localStorage.setItem("schedule", JSON.stringify(schedule));
        refetch(); // manually call react query refresh
        return true;
    };

    const deleteSlot = (id: number, name: string, day: string) => {
        let schedule: Schedule[] = getItem("schedule");
        const slots = schedule.find((slots) => slots.day == day);

        if (slots) {
            if (slots.classes) {
                let newClasses = slots.classes.filter((c) => c.id != id);
                slots.classes = newClasses;
            }
        }

        if (classes) {
            classes.removeClass(name);
        }
        localStorage.setItem("schedule", JSON.stringify(schedule));

        refetch();
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

    if (isLoading)
        return (
            <OrganiseWrapper width={width} height={height}>
                <Loading />
            </OrganiseWrapper>
        );

    if (error)
        return (
            <OrganiseWrapper width={width} height={height}>
                <Error />
            </OrganiseWrapper>
        );

    return (
        <OrganiseWrapper width={width} height={height}>
            <div className="flex w-full border-b border-bg-vis">
                {initialSchedule.map((day, i: number) => (
                    <div
                        key={i}
                        onClick={() => setSelectedDay(day.day)}
                        className={
                            "flex w-[calc(100%/7)] items-center justify-center hover:cursor-pointer " +
                            (selectedDay == day.day
                                ? "font-bold"
                                : "font-normal")
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
                            <ScheduleDay
                                key={i}
                                day={day.day}
                                classes={day.classes}
                                deleteSlot={deleteSlot}
                            />
                        );
                    })}

            {data.length == 0 || !data ? (
                <Empty component={"classes"} index={2} />
            ) : null}
            {addSlotOpen ? (
                <AddSlot close={closeAddSlot} updateSchedule={updateSchedule} />
            ) : null}

            <div className="flex w-full justify-center">
                <button onClick={() => setAddSlotOpen(true)}>Add slot</button>
            </div>
        </OrganiseWrapper>
    );
}
