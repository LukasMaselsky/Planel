import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { DateValues } from "../Assignments/UpdateAssignment";

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

type Props = {
    size: number;
    date: DateValues;
    setDate: React.Dispatch<React.SetStateAction<DateValues>>;
};

export default function Calendar({ date, setDate, size }: Props) {
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
        const daysInMonth = new Date(year, month - 1, 0).getDate();
        const firstDayOfWeek = (new Date(year, month - 1, 1).getDay() + 6) % 7;
        return { daysInMonth, firstDayOfWeek };
    };

    const incrementMonth = () => {
        setDate((prev) => ({
            day: "01",
            month: String(
                Number(prev.month) == 12
                    ? "01"
                    : Number(prev.month) + 1 < 10
                      ? "0" + (Number(prev.month) + 1)
                      : Number(prev.month) + 1,
            ),
            year: String(
                Number(prev.month) == 12 ? Number(prev.year) + 1 : prev.year,
            ),
        }));
    };

    useEffect(() => {
        const { daysInMonth, firstDayOfWeek } = getDaysInMonth(
            Number(date.year),
            Number(date.month),
        );
        setDays({ days: daysInMonth, startDay: firstDayOfWeek });
    }, [date]);

    const decrementMonth = () => {
        setDate((prev) => ({
            day: "01",
            month: String(
                Number(prev.month) == 1
                    ? 12
                    : Number(prev.month) - 1 < 10
                      ? "0" + (Number(prev.month) - 1)
                      : Number(prev.month) - 1,
            ),
            year: String(
                Number(prev.month) == 1 ? Number(prev.year) - 1 : prev.year,
            ),
        }));
    };

    const setDay = (day: number) => {
        setDate((prev) => ({
            ...prev,
            day: day < 10 ? "0" + day : String(day),
        }));
    };

    return (
        <div
            style={{ width: `${size}px` }}
            className="flex flex-col gap-4 rounded-lg border-[1px] border-black bg-gray-100 p-2"
        >
            <div className="flex items-center justify-between px-1.5">
                <div className="">
                    <p className="line-clamp-1 text-xl">{`${months[Number(date.month) - 1]} ${date.year}`}</p>
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
                                onClick={() => setDay(i - days.startDay + 1)}
                                className={twMerge(
                                    "relative flex aspect-square cursor-pointer items-center justify-center after:absolute after:left-[50%] after:top-[50%] after:z-[0] after:size-7 after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-[50%] after:border-[1px] after:bg-red-500",
                                    i - days.startDay + 1 == Number(date.day)
                                        ? "after:visible"
                                        : "after:hidden",
                                )}
                            >
                                <p className="z-10 select-none">
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
