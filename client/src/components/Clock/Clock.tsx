import { useState } from "react";
import Time from "./Time";
import Timer from "./Timer";
import Stopwatch from "./Stopwatch";

export default function Clock() {
    const [select, setSelect] = useState("clock");

    return (
        <div className="h-[300px] w-[300px]">
            <div className="flex h-full w-full items-center justify-center rounded-[50%] bg-blue-300">
                <div className="grid h-[90%] w-[90%] grid-rows-[1fr_auto_1fr] rounded-[50%] bg-white">
                    <div className="flex items-center justify-center">
                        <select className="w-25 h-10 rounded-lg border-black bg-white p-2 hover:cursor-pointer">
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
                    {select == "clock" ? <Time /> : null}
                    {select == "timer" ? <Timer /> : null}
                    {select == "stopwatch" ? <Stopwatch /> : null}
                    <div></div>
                </div>
            </div>
        </div>
    );
}
