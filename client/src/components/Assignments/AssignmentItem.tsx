import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Assignments } from "./Assignments";
import { AssignmentValues } from "./UpdateAssignment";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

interface Props {
    props: Assignments;
    deleteGrade: (name: string) => void;
    setAdding: React.Dispatch<React.SetStateAction<boolean>>;
    setDefaults: React.Dispatch<React.SetStateAction<AssignmentValues>>;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AssignmentItem({
    props,
    deleteGrade,
    setAdding,
    setDefaults,
    setEditing,
}: Props) {
    const handleEdit = () => {
        setDefaults({
            name: props.name,
            color: props.color,
            class: props.class,
            dueDate: props.dueDate,
            day: props.dueDate.slice(0, 2),
            month: props.dueDate.slice(3, 5),
            year: props.dueDate.slice(6, 10),
        });
        setEditing(true);
        setAdding(true);
    };

    return (
        <div className="flex w-full flex-col gap-2">
            <div
                className={
                    "flex w-full flex-col gap-2 rounded-lg border-[1px] border-text bg-bg px-2 py-1 text-text"
                }
                style={{ boxShadow: `0px 3px 0px 0px ${props.color}` }}
                //style={{ borderColor: props.color }}
            >
                <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                        <p className="text-xl">{props.name}</p>
                        <FontAwesomeIcon
                            className="cursor-pointer text-sm"
                            onClick={() => deleteGrade(props.name)}
                            icon={faTrashCan}
                        />
                        <FontAwesomeIcon
                            className="cursor-pointer text-sm"
                            onClick={handleEdit}
                            icon={faPencil}
                        />
                    </div>
                    <p className="flex items-center text-base">
                        {props.dueDate}
                    </p>
                </div>
            </div>
        </div>
    );
}
