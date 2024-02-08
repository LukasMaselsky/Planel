import useStopwatch from "../../hooks/useStopwatch";

export default function Stopwatch() {
    const { strTime, on, resetStopwatch, toggleStopwatch } = useStopwatch();

    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col items-center border-black px-1 py-2 text-xl">
                    {strTime[0]}
                </div>
                <div className="flex items-center">:</div>
                <div className="flex flex-col items-center border-l-0 border-r-0 border-black px-1 py-2 text-xl">
                    {strTime[1]}
                </div>
                <div className="flex items-center">:</div>
                <div className="flex flex-col items-center border-black px-1 py-2 text-xl">
                    {strTime[2]}
                </div>
            </div>
            <div className="flex items-center justify-center gap-1">
                <button
                    className="h-8 w-14 rounded-lg px-2 py-1"
                    onClick={resetStopwatch}
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
