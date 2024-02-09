import { useState } from "react";
import { days } from "./Schedule";
import { useForm } from "react-hook-form";
import AddSlotError from "./AddSlotError";

interface Props {
    cancel: () => void;
}

export default function AddSlot({ cancel }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div className="absolute left-0 top-0 h-full w-full rounded-lg bg-gray-200 p-2">
            <form
                className="grid h-full grid-rows-[1fr_auto_1fr]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div></div>
                <div className="flex flex-col gap-8">
                    <div>
                        <div className="flex w-full justify-between gap-2">
                            <input
                                className="w-full px-2 py-1 focus:outline-none"
                                placeholder="Name of slot"
                                type="text"
                                {...register("name", {
                                    required: true,
                                    minLength: 1,
                                    maxLength: 20,
                                })}
                            ></input>

                            <select
                                className="w-full px-2 py-1"
                                {...register("day")}
                            >
                                {days.map((day, i: number) => (
                                    <option key={i}>{day}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full">
                            <AddSlotError
                                name="name"
                                type="required"
                                errors={errors}
                                msg="Name is required"
                            />
                            <AddSlotError
                                name="name"
                                type="maxLength"
                                errors={errors}
                                msg="Name can't be over 20 characters"
                            />
                        </div>
                    </div>
                    <div className="flex w-full gap-2">
                        <div className="w-[50%]">
                            <input
                                className="focus:outline-none"
                                type="time"
                                name="start-time"
                            ></input>
                        </div>
                        <div className="w-[50%]">
                            <input
                                className="flex focus:outline-none"
                                type="time"
                                name="end-time"
                            ></input>
                        </div>
                    </div>
                    <div className="w-full">
                        <input
                            className="w-full px-2 py-1 focus:outline-none"
                            placeholder="Location"
                            type="text"
                            {...register("location", {
                                required: true,
                                maxLength: 30,
                            })}
                        ></input>
                        <AddSlotError
                            name="location"
                            type="required"
                            errors={errors}
                            msg="Name is required"
                        />
                        <AddSlotError
                            name="location"
                            type="maxLength"
                            errors={errors}
                            msg="Location can't be over 30 characters"
                        />
                    </div>
                </div>
                <div className="flex w-full justify-center gap-4">
                    <button type="button" onClick={cancel}>
                        Cancel
                    </button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
