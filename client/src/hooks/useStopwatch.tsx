import {
    convertFromMillis,
    convertToMillis,
    INTERVAL_IN_MILISECONDS,
} from "./useTimer";
import { useState, useEffect } from "react";

export default function useStopwatch() {
    const [on, setOn] = useState(false);
    const [time, setTime] = useState(convertToMillis(0, 0, 0));
    const [referenceTime, setReferenceTime] = useState(Date.now());
    const [strTime, setStrTime] = useState(["00", "00", "00"]);

    const resetStopwatch = () => {
        setOn(false);
        setTime(convertToMillis(0, 0, 0));
    };

    const toggleStopwatch = () => {
        setReferenceTime(Date.now());
        setOn((prev) => !prev);
    };

    useEffect(() => {
        if (on) {
            const countUp = () => {
                setTime((prevTime) => {
                    //! add upper limit

                    const now = Date.now();
                    const interval = now - referenceTime;
                    setReferenceTime(now);
                    setStrTime([...convertFromMillis(prevTime + interval)]);
                    return prevTime + interval;
                });
            };

            setTimeout(countUp, INTERVAL_IN_MILISECONDS);
        }
    }, [time, on]);

    return {
        strTime,
        on,
        resetStopwatch,
        toggleStopwatch,
    };
}
