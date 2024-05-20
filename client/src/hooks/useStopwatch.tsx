import {
    convertFromMillis,
    convertToMillis,
    INTERVAL_IN_MILISECONDS,
} from "./useTimer";
import { useState, useEffect, useMemo } from "react";

export default function useStopwatch() {
    const [on, setOn] = useState(false);
    const [time, setTime] = useState(convertToMillis(0, 0, 0));
    const [referenceTime, setReferenceTime] = useState(Date.now());
    const [strTime, setStrTime] = useState(["00", "00", "00"]);
    const [timeElapsed, setTimeElapsed] = useState(convertToMillis(0, 0, 0));

    const upperLimit = useMemo(() => convertToMillis(99, 99, 99), []);

    const resetStopwatch = () => {
        setOn(false);
        setTime(convertToMillis(0, 0, 0));
        setStrTime(["00", "00", "00"]);
    };

    const toggleStopwatch = () => {
        setReferenceTime(Date.now());
        setOn((prev) => !prev);
    };

    useEffect(() => {
        if (on) {
            const countUp = () => {
                setTime((prevTime) => {
                    if (prevTime >= upperLimit) {
                        resetStopwatch();
                        return 0;
                    }

                    const now = Date.now();
                    const interval = now - referenceTime;
                    setReferenceTime(now);
                    setStrTime([...convertFromMillis(prevTime + interval)]);
                    setTimeElapsed((prev) => prev + interval);
                    return prevTime + interval;
                });
            };

            setTimeout(countUp, INTERVAL_IN_MILISECONDS);
        }
    }, [time, on]);

    return {
        strTime,
        on,
        timeElapsed,
        resetStopwatch,
        toggleStopwatch,
    };
}
