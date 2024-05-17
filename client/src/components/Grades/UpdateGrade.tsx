import { Grades } from "./Grades";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GithubPicker } from "react-color";
import AddError from "../AddError";
import InputSelect from "../InputSelect";

interface Props {
    close: () => void;
    updateGrade: (data: Grades) => boolean;
    editing: boolean;
    defaultValues?: GradeValues;
}

const schema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" })
        .max(20, { message: "Name must be under 20 characters" }),
    color: z.string(),
    grade: z
        .string()
        .min(1, { message: "Grade is required" })
        .max(20, { message: "Grade must be under 20 characters" }),
    passingPercentage: z.number().min(0).max(100),
    gradeAsPercentage: z.number().min(0).max(100),
    gradeAsPercentageSlider: z.number().min(0).max(100),
});

export type GradeValues = z.infer<typeof schema>;

export default function UpdateGrade({
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
        control,
        setError,
        formState: { errors },
    } = useForm<GradeValues>({
        defaultValues: defaultValues,
        resolver: zodResolver(schema),
    });
    const color = watch("color");
    const sliderValue = watch("gradeAsPercentageSlider");
    const passingValue = watch("passingPercentage");

    const handleClassOption = (option: string) => {
        setValue("name", option);
    };

    const onSubmit = (data: GradeValues) => {
        const clone = (({ gradeAsPercentageSlider, ...o }) => o)(data);
        const isValid = updateGrade(clone);
        if (isValid) {
            close();
        } else {
            setError("root.exists", {
                type: "exists",
                message: "You already have a grade for this class",
            });
        }
    };

    const numTransform = z.string().transform((value) => {
        const num = value.replace(/[^0-9]/g, ""); // Use 'g' flag to remove all non-numeric characters
        const numericValue = Number(num);

        if (isNaN(numericValue)) {
            return Number(0); // If the result is NaN, return 0
        }

        return Number(Math.min(100, Math.max(0, numericValue))); // Apply the rules: between 0 and 100
    });

    const handleRangeChange = (value: number) => {
        setValue("gradeAsPercentage", value);
    };

    const handleNumberChange = (value: string) => {
        const validatedValue = numTransform.parse(value);

        setValue("gradeAsPercentageSlider", validatedValue);
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
                                <InputSelect<GradeValues>
                                    name={"name"}
                                    label={"Class"}
                                    placeholder={"Class"}
                                    control={control}
                                    handleOptionClick={handleClassOption}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="grade" className="text-sm">
                                    Grade
                                </label>
                                <input
                                    className="w-full rounded-lg px-2 py-1 text-black focus:outline-none"
                                    placeholder="Grade"
                                    id="grade"
                                    type="text"
                                    {...register("grade")}
                                ></input>
                            </div>
                        </div>
                        <AddError error={errors.name || errors.grade} />
                    </div>
                    <div className="w-full">
                        <Controller
                            name="gradeAsPercentageSlider"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <label className="text-sm">Grade (%)</label>
                                    <input
                                        className="w-full rounded-lg px-2 py-1  focus:outline-none"
                                        type="range"
                                        style={{
                                            accentColor:
                                                sliderValue >= passingValue
                                                    ? "green"
                                                    : "red",
                                        }}
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(
                                                Number(e.target.value),
                                            );
                                            handleRangeChange(
                                                Number(e.target.value),
                                            );
                                        }}
                                    />
                                </>
                            )}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex w-full gap-2">
                            <div className="flex w-[50%] items-center gap-2">
                                <Controller
                                    name="passingPercentage"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-1">
                                            <label
                                                htmlFor="pass"
                                                className="text-sm"
                                            >
                                                Pass (%)
                                            </label>
                                            <input
                                                placeholder="Minimum pass %"
                                                className="w-full rounded-lg px-2 py-1 text-center text-black focus:outline-none"
                                                type="text"
                                                id="pass"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(
                                                        numTransform.parse(
                                                            e.target.value,
                                                        ),
                                                    );
                                                }}
                                            ></input>
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="flex w-[50%] items-center gap-2">
                                <Controller
                                    name="gradeAsPercentage"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-1">
                                            <label
                                                htmlFor="gradePercentage"
                                                className="text-sm"
                                            >
                                                Grade (%)
                                            </label>
                                            <input
                                                className="w-full rounded-lg px-2 py-1 text-center text-black focus:outline-none"
                                                type="text"
                                                id="gradePercentage"
                                                placeholder="Grade %"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(
                                                        numTransform.parse(
                                                            e.target.value,
                                                        ),
                                                    );
                                                    handleNumberChange(
                                                        e.target.value,
                                                    );
                                                }}
                                            />
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        <AddError error={errors.root?.exists} />
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
