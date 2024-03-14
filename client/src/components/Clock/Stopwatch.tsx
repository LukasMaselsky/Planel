import { useContext } from "react";
import useStopwatch from "../../hooks/useStopwatch";
import { ActivityContext } from "../../context/activityContext";
import { convertFromMillis } from "../../hooks/useTimer";
import { getCurrentDate } from "../../utils/getCurrentDate";

export default function Stopwatch() {
    const { strTime, on, timeElapsed, resetStopwatch, toggleStopwatch } =
        useStopwatch();
    const activity = useContext(ActivityContext);

    const reset = () => {
        resetStopwatch();
        //* save activity
        if (activity) {
            const [h, m, s] = convertFromMillis(timeElapsed);

            activity.updateActivity({
                name: `${h}:${m}:${s}`,
                date: getCurrentDate(),
            });
        }
    };

    return (
        <>
            <div className="flex justify-center text-xl text-text">
                <div className="flex flex-col items-center border-black px-1 py-2 text-2xl">
                    {strTime[0]}
                </div>
                <div className="flex items-center">:</div>
                <div className="flex flex-col items-center border-l-0 border-r-0 border-black px-1 py-2 text-2xl">
                    {strTime[1]}
                </div>
                <div className="flex items-center">:</div>
                <div className="flex flex-col items-center border-black px-1 py-2 text-2xl">
                    {strTime[2]}
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
                    onClick={toggleStopwatch}
                >
                    {on ? "Stop" : "Start"}
                </button>
            </div>
        </>
    );
}
