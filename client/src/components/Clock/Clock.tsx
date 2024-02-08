import { useState } from "react";
import Time from "./Time";
import Timer from "./Timer";
import Stopwatch from "./Stopwatch";

export default function Clock() {
    const [select, setSelect] = useState("clock");

    return (
        <div className="h-[300px] w-[300px]">
            <div className="flex h-full w-full items-center justify-center rounded-[50%] bg-blue-300">
                <div className="flex h-[90%] w-[90%] flex-col items-center justify-center gap-4 rounded-[50%] bg-white">
                    {select == "clock" ? <Time /> : null}
                    {select == "timer" ? <Timer /> : null}
                    {select == "stopwatch" ? <Stopwatch /> : null}
                    <select className="rounded-lg border-black bg-white p-2 hover:cursor-pointer">
                        <option onClick={() => setSelect("clock")}>
                            Clock
                        </option>
                        <option onClick={() => setSelect("timer")}>
                            Timer
                        </option>
                        <option onClick={() => setSelect("stopwatch")}>
                            Stopwatch
                        </option>
                    </select>
                </div>
            </div>
        </div>
    );
}
