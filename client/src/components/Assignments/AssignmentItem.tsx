import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Assignments } from "./Assignments";
import { AssignmentValues } from "./UpdateAssignment";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { getDate } from "./UpdateAssignment";

interface Props {
    props: Assignments;
    deleteAssignment: (name: string, c: string) => void;
    completeAssignment: (name: string) => void;
    setAdding: React.Dispatch<React.SetStateAction<boolean>>;
    setDefaults: React.Dispatch<React.SetStateAction<AssignmentValues>>;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const calculateTimeLeft = (dueDate: string) => {
    const date = getDate(dueDate);
    const diffInMs = date.getTime() - new Date().getTime();
    if (diffInMs < 0) return "Overdue";

    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    if (diffInDays != 0)
        return `${diffInDays} day${diffInDays > 1 ? "s" : ""} left`;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} left`;
};

export default function AssignmentItem({
    props,
    deleteAssignment,
    completeAssignment,
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
                    <div className="flex max-w-[60%] items-center gap-1">
                        <p className="line-clamp-1 overflow-hidden text-ellipsis text-xl">
                            {props.name}
                        </p>

                        <FontAwesomeIcon
                            className="cursor-pointer text-sm"
                            onClick={() =>
                                deleteAssignment(props.name, props.class)
                            }
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
                    <p className="flex max-w-[60%] items-center overflow-hidden text-ellipsis text-base">
                        {props.class}
                    </p>
                    <div className="flex items-center gap-1">
                        <input
                            onClick={() => completeAssignment(props.name)}
                            type="checkbox"
                            className="h-5 w-5 cursor-pointer appearance-none bg-gray-300 outline-0 after:relative after:left-[37%] after:top-[15%] after:hidden after:h-[50%] after:w-[30%] after:rotate-45 after:border-b-2 after:border-l-0 after:border-r-2 after:border-t-0 after:border-black after:content-[''] checked:bg-green-300 checked:after:block"
                        ></input>
                        <p className="flex items-center text-base">
                            {timeLeft}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
