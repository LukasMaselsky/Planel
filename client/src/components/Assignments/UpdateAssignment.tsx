import { Assignments } from "./Assignments";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GithubPicker } from "react-color";
import AddError from "../AddError";
import Calendar from "../Calendar/Calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

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
    dueDate: z.string().min(10).max(10),
});

export type AssignmentValues = z.infer<typeof schema>;

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
        const isValid = updateGrade(data);
        if (isValid) {
            close();
        } else {
            setError("root.exists", {
                type: "exists",
                message: "You already have a assignment of this name",
            });
        }
    };

    const dateTransform = z.string().transform((value) => {
        /*
        const num = value.replace(/[^0-9]/g, ""); // Use 'g' flag to remove all non-numeric characters
        const numericValue = Number(num);

        if (isNaN(numericValue)) {
            return Number(0); // If the result is NaN, return 0
        }

        return Number(Math.min(100, Math.max(0, numericValue))); // Apply the rules: between 0 and 100
        */
    });

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
                            <div className="flex w-[50%] flex-col">
                                <label htmlFor="name" className="text-sm">
                                    Due date
                                </label>
                                <div className="flex items-center gap-1 rounded-lg bg-white">
                                    <input
                                        className="w-full rounded-lg px-2 py-1 focus:outline-none"
                                        id="dueDate"
                                        type="text"
                                        disabled={editing}
                                        {...register("dueDate")}
                                    ></input>
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
