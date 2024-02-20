import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ScheduleValues } from "./AddSlot";
import { FormEvent } from "react";

interface Props {
    register: UseFormRegister<ScheduleValues>;
    name: "start" | "end";
    setValue: UseFormSetValue<ScheduleValues>;
}

const validate = (e: FormEvent<HTMLInputElement>, type: "hour" | "minute") => {
    e.preventDefault();
    const value = e.currentTarget.value;

    if (!/^[0-9]+$/.test(value)) {
        // if not only digits
        return "00";
    }

    if (value == "00") {
        return value;
    }

    if (Number(value) < 0) {
        return "00";
    }

    if (Number(value) > 23 && type == "hour") {
        return "23";
    }

    if (Number(value) > 59 && type == "minute") {
        return "59";
    }

    // String(Number(value)) to prevent 020 or something like that
    return Number(value) < 10 ? "0" + String(Number(value)) : String(value);
};

export default function TimeInput({ register, name, setValue }: Props) {
    return (
        <>
            <input
                className="w-full rounded-lg px-2 py-1 text-center focus:outline-none"
                type="text"
                {...register(`${name}TimeHour`, {
                    required: true,
                    onBlur: (e) =>
                        setValue(`${name}TimeHour`, validate(e, "hour")),
                })}
            ></input>
            :
            <input
                className="w-full rounded-lg px-2 py-1 text-center focus:outline-none"
                type="text"
                {...register(`${name}TimeMinute`, {
                    required: true,
                    onBlur: (e) =>
                        setValue(`${name}TimeMinute`, validate(e, "minute")),
                })}
            ></input>
        </>
    );
}
