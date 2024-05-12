import { useState, useContext } from "react";
import { ClassesContext } from "../context/classesContext";
import { twMerge } from "tailwind-merge";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { AssignmentValues } from "./Assignments/UpdateAssignment";

interface Props<T extends FieldValues> {
    className: string;
    id: keyof T;
    disabled: boolean;
    placeholder: string;
    selectOption: UseFormSetValue<T>;
}

export default function InputSelect(props: Props<AssignmentValues>) {
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const classes = useContext(ClassesContext);

    const handleBlur = () => {
        setOpen(false);
    };

    const handleFocus = () => {
        setOpen(true);
    };

    const handle = (l: string) => {
        console.log("here");
        props.selectOption(props.id, l);
    };

    const a = ["a", "b", "c", "d", "e", "f"];
    //const a = ["a"];
    return (
        <div className="relative">
            <input
                className={props.className}
                type="text"
                id={props.id}
                disabled={props.disabled}
                placeholder={props.placeholder}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={(e) => setValue(e.target.value)}
            ></input>
            {
                <div
                    className={twMerge(
                        props.className,
                        "absolute top-[calc(100%+5px)] z-10 flex h-[300%] flex-col overflow-y-auto overflow-x-hidden bg-white p-0",
                    )}
                >
                    {a.map((l, i) => (
                        <div
                            key={i}
                            className="w-full cursor-default border-b border-gray-200 px-2 py-1 text-black hover:bg-secondary"
                            onClick={() => handle(l)}
                        >
                            {l}
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}
