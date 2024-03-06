import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPalette,
    faClockRotateLeft,
    faCalculator,
    faBook,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    const icons = [faBook, faCalculator, faClockRotateLeft, faPalette];

    return (
        <div className="flex h-[100svh] h-[100vh] w-[10vw] flex-col bg-bg p-2">
            {icons.map((icon: IconDefinition, i: number) => (
                <div
                    key={i}
                    className="flex flex-1 items-center justify-center text-2xl"
                >
                    <FontAwesomeIcon className="cursor-pointer" icon={icon} />
                </div>
            ))}
        </div>
    );
}
