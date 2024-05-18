import { useState, useContext, useEffect } from "react";
import { ClassesContext } from "../context/classesContext";
import { Control, FieldValues } from "react-hook-form";
import { Path, Controller } from "react-hook-form";

interface Props<T extends FieldValues> {
    name: Path<T>;
    label: string;
    placeholder: string;
    control: Control<T, any, T>;
    handleOptionClick: (option: string) => void;
}

export default function InputSelect<T extends FieldValues>({
    name,
    control,
    placeholder,
    label,
    handleOptionClick,
}: Props<T>) {
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [options, setOptions] = useState<string[]>([]);
    const classes = useContext(ClassesContext);

    // TODO: broken on delete
    useEffect(() => {
        if (classes) {
            setOptions(Object.keys(classes.classes));
        }
    }, [classes]);

    const handleBlur = () => {
        setTimeout(function () {
            setOptionsOpen(false);
        }, 100);
    };

    const handleFocus = () => {
        setOptionsOpen(true);
    };

    const resetOptions = () => {
        if (classes) {
            setOptions(Object.keys(classes.classes));
        }
    };

    const matchInput = (value: string, opts: string[]) => {
        console.log(value, opts);
        return opts.filter((opt) =>
            opt.toLowerCase().includes(value.toLowerCase()),
        );
    };

    const updateOptions = (value: string) => {
        if (value == "") {
            resetOptions();
        } else {
            setOptions((prev) => matchInput(value, prev));
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="relative">
                    <div className="flex flex-col gap-1">
                        <label htmlFor={name} className="text-sm">
                            {label}
                        </label>
                        <input
                            placeholder={placeholder}
                            className="w-full rounded-lg px-2 py-1 text-black focus:outline-none"
                            type="text"
                            id={name}
                            {...field}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                updateOptions(e.target.value);
                            }}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        ></input>
                    </div>
                    {optionsOpen && options.length > 0 && (
                        <div className="absolute top-[calc(100%+5px)] z-10 flex max-h-[200%] w-full flex-col overflow-y-auto overflow-x-hidden rounded-lg bg-white p-0 text-black">
                            {options.map((option: string, i: number) => (
                                <div
                                    key={i}
                                    className="hover:bg-primary-100 w-full cursor-default border-b border-gray-200 px-2 py-1 text-black"
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        />
    );
}
