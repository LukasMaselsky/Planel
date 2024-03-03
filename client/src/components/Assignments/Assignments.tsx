import { useState } from "react";
import { useQuery } from "react-query";
import { AssignmentValues } from "./UpdateAssignment";
import UpdateAssignment from "./UpdateAssignment";
import AssignmentItem from "./AssignmentItem";

const dateToString = (date: Date) => {
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month =
        date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export interface Assignments {
    name: string;
    color: string;
    class: string;
    dueDate: string;
}

const baseDefaults = {
    name: "",
    color: "#B80000",
    class: "",
    dueDate: dateToString(new Date()),
    day: "",
    month: "",
    year: "",
};

export default function Assignments() {
    const [adding, setAdding] = useState(false);
    const [defaults, setDefaults] = useState<AssignmentValues>(baseDefaults);
    const [editing, setEditing] = useState(false);

    const close = () => {
        setAdding(false);
    };

    const getAssignments = () => {
        let assignments = localStorage.getItem("assignments");
        if (assignments) {
            return JSON.parse(assignments);
        }
        return [];
    };

    const updateAssignment = (data: Assignments): boolean => {
        let assignments: Assignments[] = getAssignments();
        const slot = assignments.find((item) => item.name == data.name);

        if (slot && editing) {
            assignments[assignments.indexOf(slot)] = data;
            setEditing(false);
            localStorage.setItem("assignments", JSON.stringify(assignments));
        } else {
            if (slot) return false; // not valid

            const newGrades = [...assignments, data];
            localStorage.setItem("assignments", JSON.stringify(newGrades));
        }
        refetch(); // manually call react query refresh
        return true;
    };

    const deleteAssignment = (name: string) => {
        let assignments: Assignments[] = getAssignments();

        if (assignments) {
            assignments = assignments.filter(
                (assignment) => assignment.name != name,
            );
        }

        localStorage.setItem("grades", JSON.stringify(assignments));
        //! add delay/animation here
        setTimeout(function () {
            refetch();
        }, 100);
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryFn: getAssignments,
        queryKey: ["assignments"],
        staleTime: Infinity,
        cacheTime: 0,
    });

    if (isLoading) return <div>Loading</div>;

    if (error) return <div>Error</div>;

    return (
        <div className="relative flex h-[400px] w-[300px] flex-col gap-2 rounded-lg border-[1px] border-black p-1">
            <div className="flex h-full w-full flex-col gap-2 overflow-y-auto pb-1">
                {data &&
                    data.map((item: Assignments, i: number) => (
                        <AssignmentItem
                            key={i}
                            deleteGrade={deleteAssignment}
                            props={item}
                            setAdding={setAdding}
                            setDefaults={setDefaults}
                            setEditing={setEditing}
                        />
                    ))}
                {adding && (
                    <UpdateAssignment
                        defaultValues={defaults}
                        updateGrade={updateAssignment}
                        close={close}
                        editing={editing}
                    />
                )}
            </div>
            <div className="flex w-full justify-center">
                <button
                    onClick={() => {
                        setEditing(false);
                        setDefaults(baseDefaults);
                        setAdding(true);
                    }}
                >
                    Add assignment
                </button>
            </div>
        </div>
    );
}
