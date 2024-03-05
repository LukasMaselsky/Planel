import { z } from "zod";
import { DateValues } from "./UpdateAssignment";
import { useEffect, useState } from "react";

interface Props {
    date: DateValues;
    setDate: React.Dispatch<React.SetStateAction<DateValues>>;
}

const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
};

const dayTransform = z.string().transform((value) => {
    const num = value.replace(/[^0-9]/g, ""); // Use 'g' flag to remove all non-numeric characters
    const numericValue = Number(num);

    if (isNaN(numericValue)) {
        return "01";
    }

    return String(Math.max(1, numericValue));
});

const monthTransform = z.string().transform((value) => {
    const num = value.replace(/[^0-9]/g, ""); // Use 'g' flag to remove all non-numeric characters
    const numericValue = Number(num);

    if (isNaN(numericValue)) {
        return "01";
    }

    const n = Number(Math.min(12, Math.max(1, numericValue))); // Apply the rules: between 0 and 100
    return n < 10 ? "0" + n : String(n);
});

const yearTransform = z.string().transform((value) => {
    const num = value.replace(/[^0-9]/g, ""); // Use 'g' flag to remove all non-numeric characters
    const numericValue = Number(num);

    if (isNaN(numericValue)) {
        return `${new Date().getFullYear()}`;
    }

    return String(Number(Math.max(new Date().getFullYear(), numericValue)));
});

export default function DateInput({ date, setDate }: Props) {
    const [day, setDay] = useState(date.day);
    const [month, setMonth] = useState(date.month);
    const [year, setYear] = useState(date.year);

    useEffect(() => {
        setDay(date.day);
        setMonth(date.month);
        setYear(date.year);
    }, [date]);

    const validateDay = (value: string, month: number, year: number) => {
        const val = dayTransform.parse(value);
        const maxDay = getDaysInMonth(month, year);
        const n = Number(val) > maxDay ? maxDay : Number(val);
        let day = n < 10 ? "0" + n : String(n);

        return day;
    };

    const validateMonth = (value: string, day: number, year: number) => {
        let month = monthTransform.parse(value);
        let newDay = validateDay(String(day), Number(month), year);

        return { newDay, month };
    };

    const validateYear = (value: string, day: number, month: number) => {
        let year = yearTransform.parse(value);
        let newDay = validateDay(String(day), month, Number(year));

        return { newDay, year };
    };

    const handleDay = (val: string, month: number, year: number) => {
        setDate((prev) => ({
            ...prev,
            day: validateDay(val, month, year),
        }));
    };

    const handleMonth = (val: string, day: number, year: number) => {
        const { newDay, month } = validateMonth(val, day, year);
        setDate((prev) => ({
            ...prev,
            month: month,
            day: newDay,
        }));
    };

    const handleYear = (val: string, day: number, month: number) => {
        const { newDay, year } = validateYear(val, day, month);
        setDate((prev) => ({
            ...prev,
            day: newDay,
            year: year,
        }));
    };

    return (
        <>
            <input
                className="w-full flex-[1] rounded-lg px-2 py-1 text-center focus:outline-none"
                type="text"
                value={day}
                required={true}
                onChange={(e) => setDay(e.target.value)}
                onBlur={(e) =>
                    handleDay(
                        e.target.value,
                        Number(date.month),
                        Number(date.year),
                    )
                }
            ></input>
            /
            <input
                className="w-full flex-[1] rounded-lg px-2 py-1 text-center focus:outline-none"
                type="text"
                value={month}
                required={true}
                onChange={(e) => setMonth(e.target.value)}
                onBlur={(e) =>
                    handleMonth(
                        e.target.value,
                        Number(date.day),
                        Number(date.year),
                    )
                }
            ></input>
            /
            <input
                className="w-full flex-[2] rounded-lg px-2 py-1 text-center focus:outline-none"
                type="text"
                value={year}
                required={true}
                onChange={(e) => setYear(e.target.value)}
                onBlur={(e) =>
                    handleYear(
                        e.target.value,
                        Number(date.day),
                        Number(date.month),
                    )
                }
            ></input>
        </>
    );
}
