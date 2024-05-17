import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import MotionDropDiv from "../MotionDropDiv";

type Props = {
    name: string;
    deleteClass: (name: string) => void;
    addedByInput: boolean;
};

export default function ClassesItem({
    name,
    deleteClass,
    addedByInput,
}: Props) {
    return (
        <MotionDropDiv
            duration={0.3}
            multiple={true}
            className="flex w-full items-center justify-between gap-2 overflow-hidden border-b p-2"
        >
            <p className="overflow-hidden text-ellipsis text-lg text-text">
                {name}
            </p>

            {addedByInput && (
                <FontAwesomeIcon
                    className="cursor-pointer text-sm text-text"
                    onClick={() => deleteClass(name)}
                    icon={faTrashCan}
                />
            )}
        </MotionDropDiv>
    );
}
