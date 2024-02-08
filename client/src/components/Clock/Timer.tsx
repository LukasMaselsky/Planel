import useTimer from "../../hooks/useTimer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

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

    return (
        <div>
            <div className="flex">
                <div className="flex flex-col items-center border-[1px] border-black text-xl">
                    <div
                        onClick={incHours}
                        className="flex items-center justify-center px-4 pt-2 hover:cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faSortUp} />
                    </div>
                    {strTime[0]}
                    <div
                        onClick={decHours}
                        className="flex items-center justify-center px-4 pb-2 hover:cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faSortDown} />
                    </div>
                </div>
                <div className="flex flex-col items-center border-[1px] border-l-0 border-r-0 border-black text-xl">
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
                <div className="flex flex-col items-center border-[1px] border-black text-xl">
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
            <button onClick={resetTimer}>Reset</button>
            <button className="p-2" onClick={toggleTimer}>
                {on ? "Stop" : "Start"}
            </button>
        </div>
    );
}
