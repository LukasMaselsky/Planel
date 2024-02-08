import useTimer from "../../hooks/useTimer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import useLongPress from "../../hooks/useLongPress";

export default function Timer() {
    const {
        resetTimer,
        toggleTimer,
        strTime,
        on,
        incHours,
        decHours,
        incMinutes,
        decMinutes,
        incSeconds,
        decSeconds,
    } = useTimer();

    const pressSpeed = 100;

    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col items-center border-black text-xl">
                    <div
                        {...useLongPress(incHours, pressSpeed)}
                        onClick={incHours}
                        className="flex items-center justify-center px-4 pt-2 hover:cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faSortUp} />
                    </div>
                    {strTime[0]}
                    <div
                        {...useLongPress(decHours, pressSpeed)}
                        onClick={decHours}
                        className="flex items-center justify-center px-4 pb-2 hover:cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faSortDown} />
                    </div>
                </div>
                <div className="flex flex-col items-center border-l-0 border-r-0 border-black text-xl">
                    <div
                        onClick={incMinutes}
                        className="flex items-center justify-center px-4 pt-2 hover:cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faSortUp} />
                    </div>
                    {strTime[1]}
                    <div
                        onClick={decMinutes}
                        className="flex items-center justify-center px-4 pb-2 hover:cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faSortDown} />
                    </div>
                </div>
                <div className="flex flex-col items-center border-black text-xl">
                    <div
                        onClick={incSeconds}
                        className="flex items-center justify-center px-4 pt-2 hover:cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faSortUp} />
                    </div>
                    {strTime[2]}
                    <div
                        onClick={decSeconds}
                        className="flex items-center justify-center px-4 pb-2 hover:cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faSortDown} />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-1">
                <button
                    className="h-8 w-14 rounded-lg px-2 py-1"
                    onClick={resetTimer}
                >
                    Reset
                </button>
                <button
                    className={
                        "h-8 w-14 rounded-lg px-2 py-1 " +
                        (on ? "bg-red-300" : "bg-green-300")
                    }
                    onClick={toggleTimer}
                >
                    {on ? "Stop" : "Start"}
                </button>
            </div>
        </>
    );
}
