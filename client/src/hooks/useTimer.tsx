import { useState, useEffect } from "react";

const INTERVAL_IN_MILISECONDS = 100;

function convertFromMillis(ms: number) {
    // weird negative glitch for main function
    if (ms < 0) return "00:00:00";

    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;

    let strHours = hours < 10 ? "0" + hours : hours;
    let strMinutes = minutes < 10 ? "0" + minutes : minutes;
    let strSeconds = seconds < 10 ? "0" + seconds : seconds;

    return `${strHours}:${strMinutes}:${strSeconds}`;
}

const convertToMillis = (hrs: number, min: number, sec: number) => {
    return (hrs * 60 * 60 + min * 60 + sec) * 1000;
};

export default function useTimer() {
    const [on, setOn] = useState(false);
    const [time, setTime] = useState(convertToMillis(0, 0, 0));
    const [referenceTime, setReferenceTime] = useState(Date.now());

    const setTimer = (hours: number, minutes: number, seconds: number) => {
        const millis = convertToMillis(hours, minutes, seconds);
        setTime(millis);
    };

    const toggleTimer = () => {
        setOn((prev) => !prev);
    };

    useEffect(() => {
        if (on) {
            const countDownUntilZero = () => {
                setTime((prevTime) => {
                    if (prevTime <= 0) return 0;

                    const now = Date.now();
                    const interval = now - referenceTime;
                    setReferenceTime(now);
                    return prevTime - interval;
                });
            };

            setTimeout(countDownUntilZero, INTERVAL_IN_MILISECONDS);
        }
    }, [time]);

    return { time, convertFromMillis, setTimer, toggleTimer };
}
