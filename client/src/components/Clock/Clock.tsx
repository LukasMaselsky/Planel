import { useState } from "react";
import useTime from "../../hooks/useTime";

export default function Clock() {
    const time = useTime();

    return (
        <div className="h-[300px] w-[300px]">
            <div className="flex h-full w-full items-center justify-center rounded-[50%] bg-blue-300">
                <div className="flex h-[90%] w-[90%] flex-col items-center justify-center gap-4 rounded-[50%] bg-white">
                    <div className="text-5xl">
                        {(time.hours < 10 ? "0" + time.hours : time.hours) +
                            ":" +
                            (time.minutes < 10
                                ? "0" + time.minutes
                                : time.minutes) +
                            ":" +
                            (time.seconds < 10
                                ? "0" + time.seconds
                                : time.seconds)}
                    </div>
                    <select className="rounded-lg border-[1px] border-black bg-white p-2">
                        <option>Clock</option>
                        <option>Timer</option>
                        <option>Stopwatch</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
