import { Assignments } from "./Assignments";
import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GithubPicker } from "react-color";
import AddError from "../AddError";
import Calendar from "../Calendar/Calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import DateInput from "./DateInput";
import { useState, useContext, useEffect } from "react";
import InputSelect from "../InputSelect";
import { ClassesContext } from "../../context/classesContext";

interface Props {
    close: () => void;
    updateAssignment: (data: Assignments) => boolean;
    editing: boolean;
    defaultValues?: AssignmentValues;
}

const schema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" })
        .max(20, { message: "Name must be under 20 characters" }),
    color: z.string(),
    class: z
        .string()
        .min(1, { message: "Class is required" })
        .max(20, { message: "Class must be under 20 characters" }),
    dueDate: z.string().min(10).max(10),
});

export type AssignmentValues = z.infer<typeof schema>;

export const getDate = (date: string) => {
    const dateArr = date.split("/");
    return new Date(
        Number(dateArr[2]),
        Number(dateArr[1]) - 1,
        Number(dateArr[0]),
    );
};

const isDateAfterToday = (dateStr: string) => {
    // make sure date is not before current date
    const date = getDate(dateStr);
    const today = new Date();

    if (date < today) {
        return false;
    }
    return true;
};

export type DateValues = {
    day: string;
    month: string;
    year: string;
};

export default function UpdateAssignment({
    close,
    updateAssignment,
    defaultValues,
    editing,
}: Props) {
    const [calendarOpen, setCalendarOpen] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        setError,
        formState: { errors },
    } = useForm<AssignmentValues>({
        defaultValues: defaultValues,
        resolver: zodResolver(schema),
    });
    const color = watch("color");

    const [date, setDate] = useState<DateValues>({
        day: defaultValues?.dueDate ? defaultValues.dueDate.split("/")[0] : "",
        month: defaultValues?.dueDate
            ? defaultValues.dueDate.split("/")[1]
            : "",
        year: defaultValues?.dueDate ? defaultValues.dueDate.split("/")[2] : "",
    });

    const onSubmit = (data: AssignmentValues) => {
        data["dueDate"] = `${date.day}/${date.month}/${date.year}`;

        if (isDateAfterToday(data["dueDate"])) {
            const isValid = updateAssignment(data);
            if (isValid) {
                close();
            } else {
                setError("root.exists", {
                    type: "exists",
                    message: "An an assignment of this name already exists",
                });
            }
        } else {
            setError("dueDate", {
                type: "custom",
                message: "Due date has to be after today",
            });
        }
    };

    return (
        <div className="absolute left-0 top-0 h-full w-full rounded-lg bg-bg p-2 text-text">
            <form
                className="grid h-full grid-rows-[1fr_auto_1fr]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div></div>
                <div className="flex flex-col gap-3">
                    <div
                        className="h-3 w-full rounded-md"
                        style={{ backgroundColor: color }}
                    ></div>
                    <div>
                        <div className="flex w-full justify-between gap-2">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="name" className="text-sm">
                                    Name
                                </label>
                                <input
                                    className="w-full rounded-lg px-2 py-1 text-black focus:outline-none"
                                    placeholder="Name"
                                    id="name"
                                    type="text"
                                    disabled={editing}
                                    {...register("name")}
                                ></input>
                            </div>

                            <div className="flex flex-col gap-1">
                                <InputSelect<AssignmentValues>
                                    className={
                                        "w-full rounded-lg px-2 py-1 text-black focus:outline-none"
                                    }
                                    key="class"
                                    placeholder="Class"
                                    disabled={false}
                                    selectOption={setValue}
                                    register={register}
                                />
                                {/*
                                <input
                                    className="w-full rounded-lg px-2 py-1 text-black focus:outline-none"
                                    placeholder="Class"
                                    id="class"
                                    type="text"
                                    {...register("class")}
                                ></input>
                                */}
                            </div>
                        </div>
                        <AddError
                            error={
                                errors.name ||
                                errors.class ||
                                errors.root?.exists
                            }
                        />
                    </div>
                    <div>
                        <div className="flex w-full justify-center gap-2 text-black">
                            <div className="relative flex w-[70%] flex-col gap-1">
                                <label
                                    htmlFor="name"
                                    className="text-sm text-text"
                                >
                                    Due date
                                </label>
                                <div className="flex items-center gap-1 rounded-lg bg-white">
                                    <div className="flex items-center">
                                        <DateInput
                                            date={date}
                                            setDate={setDate}
                                        />
                                    </div>
                                    <FontAwesomeIcon
                                        className="cursor-pointer pr-2 text-lg"
                                        icon={faCalendar}
                                        onClick={() =>
                                            setCalendarOpen((prev) => !prev)
                                        }
                                    />
                                </div>
                                {calendarOpen && (
                                    <div className="absolute top-[calc(100%+5px)] z-[1]">
                                        <Calendar
                                            date={date}
                                            setDate={setDate}
                                            size={200}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <AddError error={errors.dueDate} />
                    </div>
                    <div className="w-full">
                        <GithubPicker
                            width="100%"
                            color={color}
                            triangle="hide"
                            {...(register("color"),
                            {
                                onChange: (col) => {
                                    setValue("color", col.hex);
                                },
                            })}
                        />
                    </div>
                </div>
                <div className="flex w-full justify-center gap-4 pt-2">
                    <button type="button" onClick={close}>
                        Cancel
                    </button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
