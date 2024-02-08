import useStopwatch from "../../hooks/useStopwatch";

export default function Stopwatch() {
    const { strTime, on, resetStopwatch, toggleStopwatch } = useStopwatch();

    return (
        <div>
            <div className="flex">
                <div className="flex flex-col items-center border-black p-2 text-xl">
                    {strTime[0]}
                </div>
                <div className="flex flex-col items-center border-l-0 border-r-0 border-black p-2 text-xl">
                    {strTime[1]}
                </div>
                <div className="flex flex-col items-center border-black p-2 text-xl">
                    {strTime[2]}
                </div>
            </div>
            <button onClick={resetStopwatch}>Reset</button>
            <button className="p-2" onClick={toggleStopwatch}>
                {on ? "Stop" : "Start"}
            </button>
        </div>
    );
}
