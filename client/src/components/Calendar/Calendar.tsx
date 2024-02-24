import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
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
        day: new Date().getDay(),
    });

    const incrementMonth = () => {
        setDate((prev) => ({
            year: prev.month == 11 ? prev.year + 1 : prev.year,
            month: prev.month == 11 ? 0 : prev.month + 1,
            day: 1,
        }));
    };

    const decrementMonth = () => {
        setDate((prev) => ({
            year: prev.month == 0 ? prev.year - 1 : prev.year,
            month: prev.month == 0 ? 11 : prev.month - 1,
            day: 1,
        }));
    };

    return (
        <div className="flex w-[300px] flex-col gap-4 p-2">
            <div className="flex items-center justify-between">
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
                {days.map((day) => (
                    <div className="flex items-center justify-center">
                        <p>{day}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
