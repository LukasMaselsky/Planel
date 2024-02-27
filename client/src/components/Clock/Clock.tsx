import { useState } from "react";
import Time from "./Time";
import Timer from "./Timer";
import Stopwatch from "./Stopwatch";
import TimerBorder from "./TimerBorder";

export type TimerState = "start" | "stop" | "reset" | undefined;

export default function Clock() {
    const [select, setSelect] = useState("clock");
    const [timerState, setTimerState] = useState<TimerState>();
    const [timerDuration, setTimerDuration] = useState(0);

    return (
        <div className="relative h-[300px] w-[300px]">
            <TimerBorder
                size={300}
                strokeWidth={5}
                duration={timerDuration - 1} //! sketchy workaround due to useTimer being weird
                timerState={timerState}
            />

            <div className="z-10 grid h-[100%] w-[100%] grid-rows-[1fr_auto_1fr] rounded-[50%]">
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
                {select == "timer" ? (
                    <Timer
                        setTimerState={setTimerState}
                        setTimerDuration={setTimerDuration}
                    />
                ) : null}
                {select == "stopwatch" ? <Stopwatch /> : null}
                <div></div>
            </div>
        </div>
    );
}
