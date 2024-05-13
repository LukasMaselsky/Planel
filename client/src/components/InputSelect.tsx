import { useState, useContext, useEffect } from "react";
import { ClassesContext } from "../context/classesContext";
import { twMerge } from "tailwind-merge";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Path, PathValue } from "react-hook-form";

interface Props<T extends FieldValues> {
    className: string;
    key: Path<T>;
    disabled: boolean;
    placeholder: string;
    selectOption: UseFormSetValue<T>;
    register: UseFormRegister<T>;
}

export default function InputSelect<T extends FieldValues>(props: Props<T>) {
    type Keys = keyof T;

    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<string[]>([]);

    const classes = useContext(ClassesContext);

    useEffect(() => {
        if (classes) {
            setOptions(Object.keys(classes.classes));
        }
    }, [classes]);

    const handleBlur = () => {
        setTimeout(function () {
            setOpen(false);
        }, 100);
    };

    const handleFocus = () => {
        setOpen(true);
    };

    const handle = (value: any) => {
        props.selectOption(props.key, value);
    };

    return (
        <div className="relative">
            <label htmlFor={props.key} className="text-sm">
                {props.key}
            </label>
            <input
                className={props.className}
                type="text"
                id={props.key}
                disabled={props.disabled}
                placeholder={props.placeholder}
                onFocus={handleFocus}
                {...props.register(props.key)}
            ></input>
            {open && (
                <div
                    className={twMerge(
                        props.className,
                        "absolute top-[calc(100%+5px)] z-10 flex h-[300%] flex-col overflow-y-auto overflow-x-hidden bg-white p-0",
                    )}
                >
                    {options.map((option, i: number) => (
                        <div
                            key={i}
                            className="w-full cursor-default border-b border-gray-200 px-2 py-1 text-black hover:bg-secondary"
                            onClick={() => handle(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
