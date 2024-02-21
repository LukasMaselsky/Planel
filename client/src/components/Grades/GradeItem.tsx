import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grades } from "./Grades";
import { GradeValues } from "./UpdateGrade";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

interface Props {
    props: Grades;
    deleteGrade: (name: string) => void;
    setAdding: React.Dispatch<React.SetStateAction<boolean>>;
    setDefaults: React.Dispatch<React.SetStateAction<GradeValues>>;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GradeItem({
    props,
    deleteGrade,
    setAdding,
    setDefaults,
    setEditing,
}: Props) {
    const passingMark = `${props.passingPercentage}%`;
    const bar = `${props.gradeAsPercentage}%`;

    const handleEdit = () => {
        setDefaults({
            name: props.name,
            color: props.color,
            grade: props.grade,
            passingPercentage: props.passingPercentage,
            gradeAsPercentage: props.gradeAsPercentage,
            gradeAsPercentageSlider: props.gradeAsPercentage,
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
                    <p className="flex items-center text-base">{props.grade}</p>
                </div>
                <div className="flex justify-between font-light">
                    <div className="relative flex h-3 w-full overflow-hidden rounded-md border-[1px] border-black">
                        <div
                            className="absolute h-4 w-[2px] bg-red-500"
                            style={{ left: passingMark }}
                        ></div>
                        <div
                            className="bg-green-500"
                            style={{ width: bar }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
