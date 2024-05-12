import ClassesItem from "./ClassesItem";
import { useState, useContext } from "react";
import { ClassesContext } from "../../context/classesContext";

type Props = {
    width: string;
    height: string;
};

export default function Classes({ width, height }: Props) {
    const [inputValue, setInputValue] = useState<string>("");
    const classes = useContext(ClassesContext);

    const add = () => {
        if (inputValue != "" && classes) {
            classes.addClass(inputValue);
        }
    };

    const remove = (name: string) => {
        if (classes) {
            classes.deleteClass(name);
        }
    };

    return (
        <div
            className="flex flex-col overflow-y-auto rounded-lg border-[1px] border-text p-4"
            style={{ height: height, width: width }}
        >
            <input
                className="w-full rounded-lg border-none bg-bg-vis p-2 text-text focus:outline-none"
                placeholder="Add class"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
                onKeyUp={(e) => e.key === "Enter" && add()}
            ></input>
            {classes &&
                Object.keys(classes.classes).map((c: string, i: number) => (
                    <ClassesItem key={i} name={c} deleteClass={remove} />
                ))}
            {classes && Object.keys(classes.classes).length == 0 ? (
                <div className="flex w-full grow items-center justify-center p-2 text-text">
                    No classes yet
                </div>
            ) : null}
        </div>
    );
}
