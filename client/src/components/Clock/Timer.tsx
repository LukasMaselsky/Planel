import useTimer, { convertFromMillis } from "../../hooks/useTimer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import useLongPress from "../../hooks/useLongPress";
import { TimerState } from "./Clock";
import { useContext, useEffect } from "react";
import { ActivityContext } from "../../context/activityContext";
import { getCurrentDate } from "../../utils/getCurrentDate";

type Props = {
    setTimerState: React.Dispatch<React.SetStateAction<TimerState>>;
    setTimerDuration: React.Dispatch<React.SetStateAction<number>>;
};

export default function Timer({ setTimerState, setTimerDuration }: Props) {
    const activity = useContext(ActivityContext);

    const {
        resetTimer,
        toggleTimer,
        strTime,
        on,
        time,
        timeElapsed,
        timerFinished,
        incHours,
        decHours,
        incMinutes,
        decMinutes,
        incSeconds,
        decSeconds,
    } = useTimer();

    const pressSpeed = 100;

    const toggle = () => {
        toggleTimer();
    };

    useEffect(() => {
        if (on) {
            setTimerState("start");
        } else {
            if (time == 0) {
                setTimerState("reset");
            } else {
                setTimerState("stop");
            }
        }
    }, [on]);

    useEffect(() => {
        setTimerDuration(time / 1000);
    }, [time]);

    useEffect(() => {
        if (timerFinished) {
            //* save activity
            if (activity) {
                const [h, m, s] = convertFromMillis(timeElapsed);

                activity.updateActivity({
                    name: `${h}:${m}:${s}`,
                    date: getCurrentDate(),
                });
            }
        }
    }, [timerFinished]);

    const reset = () => {
        setTimerState("reset");
        resetTimer();
    };

    return (
        <>
            <div className="flex items-center justify-center text-xl text-text">
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
                :
                <div className="flex flex-col items-center border-l-0 border-r-0 border-black text-xl">
                    <div
                        {...useLongPress(incMinutes, pressSpeed)}
                        onClick={incMinutes}
                        className="flex items-center justify-center px-4 pt-2 hover:cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faSortUp} />
                    </div>
                    {strTime[1]}
                    <div
                        {...useLongPress(decMinutes, pressSpeed)}
                        onClick={decMinutes}
                        className="flex items-center justify-center px-4 pb-2 hover:cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faSortDown} />
                    </div>
                </div>
                :
                <div className="flex flex-col items-center border-black text-xl">
                    <div
                        {...useLongPress(incSeconds, pressSpeed)}
                        onClick={incSeconds}
                        className="flex items-center justify-center px-4 pt-2 hover:cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faSortUp} />
                    </div>
                    {strTime[2]}
                    <div
                        {...useLongPress(decSeconds, pressSpeed)}
                        onClick={decSeconds}
                        className="flex items-center justify-center px-4 pb-2 hover:cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faSortDown} />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-1">
                <button
                    className="h-8 w-14 rounded-lg px-2 py-1 text-text"
                    onClick={reset}
                >
                    Reset
                </button>
                <button
                    className={
                        "h-8 w-14 rounded-lg px-2 py-1 " +
                        (on ? "bg-red-300" : "bg-green-300")
                    }
                    onClick={toggle}
                >
                    {on ? "Stop" : "Start"}
                </button>
            </div>
        </>
    );
}
