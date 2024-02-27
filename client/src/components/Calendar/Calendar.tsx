import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const daysShort = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export default function Calendar() {
    const [date, setDate] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: 1,
    });

    const [days, setDays] = useState({
        days: new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0,
        ).getDate(),
        startDay:
            (new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                1,
            ).getDay() +
                6) %
            7,
    });

    const getDaysInMonth = (year: number, month: number) => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7;
        return { daysInMonth, firstDayOfWeek };
    };

    const incrementMonth = () => {
        setDate((prev) => ({
            year: prev.month == 11 ? prev.year + 1 : prev.year,
            month: prev.month == 11 ? 0 : prev.month + 1,
            day: 1,
        }));
    };

    useEffect(() => {
        const { daysInMonth, firstDayOfWeek } = getDaysInMonth(
            date.year,
            date.month,
        );
        setDays({ days: daysInMonth, startDay: firstDayOfWeek });
    }, [date]);

    const decrementMonth = () => {
        setDate((prev) => ({
            year: prev.month == 0 ? prev.year - 1 : prev.year,
            month: prev.month == 0 ? 11 : prev.month - 1,
            day: 1,
        }));
    };

    return (
        <div className="flex w-[300px] flex-col gap-4 rounded-lg border-[1px] border-black p-2">
            <div className="flex items-center justify-between px-1.5">
                <div className="">
                    <p className="text-xl">{`${months[date.month]} ${date.year}`}</p>
                </div>
                <div className="flex gap-2">
                    <FontAwesomeIcon
                        className="cursor-pointer text-xl"
                        onClick={decrementMonth}
                        icon={faAngleLeft}
                    />
                    <FontAwesomeIcon
                        className="cursor-pointer text-xl"
                        onClick={incrementMonth}
                        icon={faAngleRight}
                    />
                </div>
            </div>
            <div className="grid grid-cols-7 justify-between">
                {daysShort.map((day, i) => (
                    <div
                        key={i}
                        className="flex aspect-square items-center justify-center"
                    >
                        <p>{day}</p>
                    </div>
                ))}
                {[...Array(days.days + days.startDay)].map((_, i) => {
                    if (i >= days.startDay) {
                        return (
                            <div
                                key={i}
                                onClick={() =>
                                    setDate((prev) => ({
                                        ...prev,
                                        day: i - days.startDay + 1,
                                    }))
                                }
                                className={twMerge(
                                    "relative flex aspect-square cursor-pointer items-center justify-center after:absolute after:left-[50%] after:top-[50%] after:z-[-1] after:size-7 after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-[50%] after:bg-red-500",
                                    i - days.startDay + 1 == date.day
                                        ? "after:visible"
                                        : "after:hidden",
                                )}
                            >
                                <p className="select-none">
                                    {i - days.startDay + 1}
                                </p>
                            </div>
                        );
                    } else {
                        return (
                            <div
                                key={i}
                                className="flex aspect-square items-center justify-center"
                            ></div>
                        );
                    }
                })}
            </div>
        </div>
    );
}
