import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Assignments } from "./Assignments";
import { AssignmentValues } from "./UpdateAssignment";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { getDate } from "./UpdateAssignment";

interface Props {
    props: Assignments;
    deleteGrade: (name: string) => void;
    setAdding: React.Dispatch<React.SetStateAction<boolean>>;
    setDefaults: React.Dispatch<React.SetStateAction<AssignmentValues>>;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const calculateTimeLeft = (dueDate: string) => {
    const date = getDate(dueDate);
    const diffInMs = date.getTime() - new Date().getTime();

    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    if (Math.floor(diffInDays) != 0)
        return `${Math.floor(diffInDays)} days left`;
    return `${Math.floor(diffInMs / (1000 * 60 * 60))} hours left`;
};

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
        });
        setEditing(true);
        setAdding(true);
    };

    const timeLeft = calculateTimeLeft(props.dueDate);

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
                <div className="flex justify-between">
                    <p className="flex items-center text-base">{props.class}</p>
                    <p className="flex items-center text-base">{timeLeft}</p>
                </div>
            </div>
        </div>
    );
}
