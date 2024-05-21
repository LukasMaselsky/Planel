import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { AssignmentValues } from "./UpdateAssignment";
import UpdateAssignment from "./UpdateAssignment";
import AssignmentItem from "./AssignmentItem";
import { getCurrentDate } from "../../utils/date";
import { ActivityContext } from "../../context/activityContext";
import { dateToString } from "../../utils/date";
import { getItem } from "../../utils/localStorage";
import { ClassesContext } from "../../context/classesContext";
import Empty from "../Empty";
import Loading from "../Loading";
import OrganiseWrapper from "../OrganiseWrapper";
import { AnimatePresence } from "framer-motion";
import Error from "../Error";

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
    const classes = useContext(ClassesContext);

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
            if (classes) {
                classes.updateClass(slot.class, data.class);
            }

            assignments[assignments.indexOf(slot)] = data;
            setEditing(false);
            localStorage.setItem("assignments", JSON.stringify(assignments));
        } else {
            if (slot) return false; // not valid

            if (classes) {
                classes.addClass(data.class);
            }
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
                    type: "assignment",
                });
            }

            assignments = assignments.filter(
                (assignment) => assignment.name != name,
            );
        }

        localStorage.setItem("assignments", JSON.stringify(assignments));

        refetch();
    };

    const deleteAssignment = (name: string, c: string) => {
        let assignments: Assignments[] = getItem("assignments");

        if (assignments) {
            assignments = assignments.filter(
                (assignment) => assignment.name != name,
            );
        }

        if (classes) {
            classes.removeClass(c);
        }
        localStorage.setItem("assignments", JSON.stringify(assignments));

        refetch();
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryFn: () => getItem("assignments"),
        queryKey: ["assignments"],
        staleTime: Infinity,
        cacheTime: 0,
    });

    if (isLoading)
        return (
            <OrganiseWrapper width={width} height={height}>
                <Loading />
            </OrganiseWrapper>
        );

    if (error)
        return (
            <OrganiseWrapper width={width} height={height}>
                <Error />
            </OrganiseWrapper>
        );

    return (
        <OrganiseWrapper width={width} height={height}>
            <div className="flex h-full w-full flex-col gap-2 overflow-y-auto overflow-x-hidden pb-1">
                <AnimatePresence>
                    {data &&
                        data.map((item: Assignments) => (
                            <AssignmentItem
                                key={item.name}
                                deleteAssignment={deleteAssignment}
                                completeAssignment={completeAssignment}
                                props={item}
                                setAdding={setAdding}
                                setDefaults={setDefaults}
                                setEditing={setEditing}
                            />
                        ))}
                </AnimatePresence>
                {adding && (
                    <UpdateAssignment
                        defaultValues={defaults}
                        updateAssignment={updateAssignment}
                        close={close}
                        editing={editing}
                    />
                )}
                {data && data.length == 0 ? (
                    <Empty component={"assignments"} index={0} />
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
        </OrganiseWrapper>
    );
}
