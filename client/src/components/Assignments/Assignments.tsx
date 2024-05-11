import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { AssignmentValues } from "./UpdateAssignment";
import UpdateAssignment from "./UpdateAssignment";
import AssignmentItem from "./AssignmentItem";
import { getCurrentDate } from "../../utils/date";
import { ActivityContext } from "../../context/activityContext";
import { dateToString } from "../../utils/date";
import { getItem } from "../../utils/localStorage";

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
};

type Props = {
    height: string;
    width: string;
};

export default function Assignments({ height, width }: Props) {
    const activity = useContext(ActivityContext);

    const [adding, setAdding] = useState(false);
    const [defaults, setDefaults] = useState<AssignmentValues>(baseDefaults);
    const [editing, setEditing] = useState(false);

    const close = () => {
        setAdding(false);
    };

    const updateAssignment = (data: Assignments): boolean => {
        let assignments: Assignments[] = getItem("assignments");
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

    const completeAssignment = (name: string) => {
        let assignments: Assignments[] = getItem("assignments");

        if (assignments) {
            //* add to activity
            let assignment = assignments.filter((a) => a.name == name);
            if (activity && assignment) {
                activity.updateActivity({
                    name: assignment[0].name,
                    date: getCurrentDate(),
                });
            }

            assignments = assignments.filter(
                (assignment) => assignment.name != name,
            );
        }

        localStorage.setItem("assignments", JSON.stringify(assignments));
        //! add delay/animation here
        setTimeout(function () {
            refetch();
        }, 100);
    };

    const deleteAssignment = (name: string) => {
        let assignments: Assignments[] = getItem("assignments");

        if (assignments) {
            assignments = assignments.filter(
                (assignment) => assignment.name != name,
            );
        }

        localStorage.setItem("assignments", JSON.stringify(assignments));
        //! add delay/animation here
        setTimeout(function () {
            refetch();
        }, 100);
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryFn: () => getItem("assignments"),
        queryKey: ["assignments"],
        staleTime: Infinity,
        cacheTime: 0,
    });

    if (isLoading) return <div>Loading</div>;

    if (error) return <div>Error</div>;

    return (
        <div
            className="relative flex flex-col gap-2 rounded-lg border-[1px] border-text p-1"
            style={{ height: height, width: width }}
        >
            <div className="flex h-full w-full flex-col gap-2 overflow-y-auto pb-1">
                {data &&
                    data.map((item: Assignments, i: number) => (
                        <AssignmentItem
                            key={i}
                            deleteAssignment={deleteAssignment}
                            completeAssignment={completeAssignment}
                            props={item}
                            setAdding={setAdding}
                            setDefaults={setDefaults}
                            setEditing={setEditing}
                        />
                    ))}
                {adding && (
                    <UpdateAssignment
                        defaultValues={defaults}
                        updateAssignment={updateAssignment}
                        close={close}
                        editing={editing}
                    />
                )}
                {data && data.length == 0 ? (
                    <div className="flex w-full grow items-center justify-center p-2 text-text">
                        No assignments yet
                    </div>
                ) : null}
            </div>
            <div className="flex w-full justify-center text-text">
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
