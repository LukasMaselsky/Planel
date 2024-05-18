import { days } from "./Schedule";
import { useForm } from "react-hook-form";
import AddError from "../AddError";
import TimeInput from "./TimeInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GithubPicker } from "react-color";
import InputSelect from "../InputSelect";

const schema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" })
        .max(20, { message: "Name must be under 20 characters" }),
    location: z
        .string()
        .min(1, { message: "Location is required" })
        .max(30, { message: "Location must be under 20 characters" }),
    day: z.string(),
    color: z.string(),
    startTimeHour: z.string().min(2).max(2),
    startTimeMinute: z.string().min(2).max(2),
    endTimeHour: z.string().min(2).max(2),
    endTimeMinute: z.string().min(2).max(2),
});

export type ScheduleValues = z.infer<typeof schema>;
interface Props {
    close: () => void;
    updateSchedule: (data: ScheduleValues) => boolean;
}

export default function AddSlot({ close, updateSchedule }: Props) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        setError,
        formState: { errors },
    } = useForm<ScheduleValues>({
        defaultValues: {
            name: "",
            location: "",
            day: "Monday",
            color: "#B80000",
            startTimeHour: "00",
            startTimeMinute: "00",
            endTimeHour: "00",
            endTimeMinute: "00",
        },
        resolver: zodResolver(schema),
    });
    const color = watch("color");

    const handleClassOption = (option: string) => {
        setValue("name", option);
    };

    const onSubmit = (data: ScheduleValues) => {
        const isValid = updateSchedule(data);
        if (isValid) {
            close();
        } else {
            setError("root.overlap", {
                type: "overlap",
                message: "You have an overlap in your schedule",
            });
        }
    };

    return (
        <div className="absolute left-0 top-0 h-full w-full overflow-x-hidden rounded-lg bg-bg p-2 text-black text-text">
            <form
                className="grid h-full grid-rows-[1fr_auto_1fr]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div></div>
                <div className="flex flex-col gap-5">
                    <div
                        className="h-3 w-full rounded-md"
                        style={{ backgroundColor: color }}
                    ></div>
                    <div>
                        <div className="flex w-full gap-2">
                            <div className="flex w-full flex-col gap-1">
                                <InputSelect<ScheduleValues>
                                    name={"name"}
                                    label={"Class"}
                                    placeholder={"Class"}
                                    control={control}
                                    handleOptionClick={handleClassOption}
                                />
                            </div>

                            <div className="flex w-full flex-col gap-1">
                                <label htmlFor="day" className="text-sm">
                                    Day
                                </label>
                                <select
                                    className="h-full w-full rounded-lg bg-white px-2 py-1 text-black"
                                    id="day"
                                    {...register("day")}
                                >
                                    {days.map((day, i: number) => (
                                        <option key={i}>{day}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <AddError error={errors.name} />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex w-full gap-6">
                            <div className="flex w-full flex-col gap-1">
                                <label htmlFor="startTime" className="text-sm">
                                    Start time
                                </label>
                                <div
                                    id="startTime"
                                    className="flex w-full items-center gap-2 text-black"
                                >
                                    <TimeInput
                                        register={register}
                                        setValue={setValue}
                                        name="start"
                                    />
                                </div>
                            </div>
                            <div className="flex w-full flex-col gap-1">
                                <label htmlFor="endTime" className="text-sm">
                                    End time
                                </label>
                                <div className="flex w-full items-center gap-2 text-black">
                                    <TimeInput
                                        register={register}
                                        setValue={setValue}
                                        name="end"
                                    />
                                </div>
                            </div>
                        </div>
                        <AddError error={errors.root?.overlap} />
                    </div>
                    <div className="w-full">
                        <div className="flex w-full flex-col gap-1">
                            <label htmlFor="location" className="text-sm">
                                Location
                            </label>
                            <input
                                className="w-full rounded-lg px-2 py-1 text-black focus:outline-none"
                                placeholder="Location"
                                id="location"
                                type="text"
                                {...register("location")}
                            ></input>
                        </div>
                        <AddError error={errors.location} />
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
                <div className="flex w-full justify-center gap-4 text-text">
                    <button type="button" onClick={close}>
                        Cancel
                    </button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
