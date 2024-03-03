import { Assignments } from "./Assignments";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GithubPicker } from "react-color";
import AddError from "../AddError";
import Calendar from "../Calendar/Calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import DateInput from "./DateInput";

interface Props {
    close: () => void;
    updateGrade: (data: Assignments) => boolean;
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
    day: z.string().min(2).max(2),
    month: z.string().min(2).max(2),
    year: z.string().min(4).max(4),
    dueDate: z.string().min(10).max(10),
});

export type AssignmentValues = z.infer<typeof schema>;

const getDate = (date: string) => {
    const dateArr = date.split("/");
    return new Date(
        Number(dateArr[2]),
        Number(dateArr[1]) - 1,
        Number(dateArr[1]),
    );
};

const isDateAfterToday = (dateStr: string) => {
    // make sure date is not before current date
    const date = getDate(dateStr);
    const today = new Date();
    console.log(date, today);
    if (date < today) {
        return false;
    }
    return true;
};

export default function UpdateAssignment({
    close,
    updateGrade,
    defaultValues,
    editing,
}: Props) {
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

    const onSubmit = (data: AssignmentValues) => {
        data["dueDate"] = `${data.day}/${data.month}/${data.year}`;
        console.log(data["dueDate"]);
        if (isDateAfterToday(data["dueDate"])) {
            const clone = (({ day, month, year, ...o }) => o)(data);
            const isValid = updateGrade(clone);
            if (isValid) {
                close();
            } else {
                setError("root.exists", {
                    type: "exists",
                    message: "You already have a assignment of this name",
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
        <div className="absolute left-0 top-0 h-full w-full rounded-lg bg-gray-100 p-2">
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
                                    className="w-full rounded-lg px-2 py-1 focus:outline-none"
                                    placeholder="Name of class"
                                    id="name"
                                    type="text"
                                    disabled={editing}
                                    {...register("name")}
                                ></input>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="grade" className="text-sm">
                                    Class
                                </label>
                                <input
                                    className="w-full rounded-lg px-2 py-1 focus:outline-none"
                                    placeholder="Class"
                                    id="class"
                                    type="text"
                                    {...register("class")}
                                ></input>
                            </div>
                        </div>
                        <AddError error={errors.name || errors.class} />
                    </div>
                    <div>
                        <div className="flex w-full justify-center gap-2">
                            <div className="flex w-[70%] flex-col">
                                <label htmlFor="name" className="text-sm">
                                    Due date
                                </label>
                                <div className="flex items-center gap-1 rounded-lg bg-white">
                                    <div className="flex items-center">
                                        <DateInput
                                            register={register}
                                            setValue={setValue}
                                            watch={watch}
                                        />
                                    </div>
                                    <FontAwesomeIcon
                                        className="pr-2 text-lg"
                                        icon={faCalendar}
                                    />
                                </div>
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
