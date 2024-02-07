import { useState } from "react";
import Time from "./Time";
import Timer from "./Timer";

export default function Clock() {
    return (
        <div className="h-[300px] w-[300px]">
            <div className="flex h-full w-full items-center justify-center rounded-[50%] bg-blue-300">
                <div className="flex h-[90%] w-[90%] flex-col items-center justify-center gap-4 rounded-[50%] bg-white">
                    <Time />
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
