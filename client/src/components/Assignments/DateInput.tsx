import {
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form";
import { AssignmentValues } from "./UpdateAssignment";
import { z } from "zod";
import { useEffect } from "react";

interface Props {
    register: UseFormRegister<AssignmentValues>;
    setValue: UseFormSetValue<AssignmentValues>;
    watch: UseFormWatch<AssignmentValues>;
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


export default function DateInput({ register, setValue, watch }: Props) {
    const day = watch("day");
    const month = watch("month");
    const year = watch("year");

    const validateDay = (
        value: string,
        month: number,
        year: number,
    ): string => {
        const val = dayTransform.parse(value);
        const maxDay = getDaysInMonth(month, year);
        const n = Number(val) > maxDay ? maxDay : Number(val);
        let day = n < 10 ? "0" + n : String(n);

        return day;
    };

    const validateMonth = (
        value: string,
        day: number,
        year: number,
    ): string => {
        let month = monthTransform.parse(value);
        setValue("day", validateDay(String(day), Number(month), year));

        return month;
    };

    const validateYear = (
        value: string,
        day: number,
        month: number,
    ): string => {
        let year = yearTransform.parse(value);
        setValue("day", validateDay(String(day), month, Number(year)));

        return year;
    };

    return (
        <>
            <input
                className="w-full flex-[1] rounded-lg px-2 py-1 text-center focus:outline-none"
                type="text"
                {...register(`day`, {
                    required: true,
                    onBlur: (e) =>
                        setValue(
                            `day`,
                            validateDay(
                                e.target.value,
                                Number(month),
                                Number(year),
                            ),
                        ),
                })}
            ></input>
            /
            <input
                className="w-full flex-[1] rounded-lg px-2 py-1 text-center focus:outline-none"
                type="text"
                {...register(`month`, {
                    required: true,
                    onBlur: (e) =>
                        setValue(
                            `month`,
                            validateMonth(
                                e.target.value,
                                Number(day),
                                Number(year),
                            ),
                        ),
                })}
            ></input>
            /
            <input
                className="w-full flex-[2] rounded-lg px-2 py-1 text-center focus:outline-none"
                type="text"
                {...register(`year`, {
                    required: true,
                    onBlur: (e) =>
                        setValue(
                            `year`,
                            validateYear(
                                e.target.value,
                                Number(day),
                                Number(month),
                            ),
                        ),
                })}
            ></input>
        </>
    );
}
