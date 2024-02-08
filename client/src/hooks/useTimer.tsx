import { useState, useEffect } from "react";

export const INTERVAL_IN_MILISECONDS = 100;

export function convertFromMillis(ms: number): string[] {
    // weird negative glitch for main function
    if (ms < 0) return ["00", "00", "00"];

    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;

    let strHours = hours < 10 ? "0" + hours : String(hours);
    let strMinutes = minutes < 10 ? "0" + minutes : String(minutes);
    let strSeconds = seconds < 10 ? "0" + seconds : String(seconds);

    return [strHours, strMinutes, strSeconds];
}

export const convertToMillis = (
    hrs: number,
    min: number,
    sec: number,
): number => {
    return (hrs * 60 * 60 + min * 60 + sec) * 1000;
};

export default function useTimer() {
    const [on, setOn] = useState(false);
    const [time, setTime] = useState(convertToMillis(0, 0, 0));
    const [referenceTime, setReferenceTime] = useState(Date.now());
    const [strTime, setStrTime] = useState(["00", "00", "00"]);

    const setTimer = (hours: number, minutes: number, seconds: number) => {
        const millis = convertToMillis(hours, minutes, seconds);
        setTime(millis);
        setStrTime([...convertFromMillis(millis)]);
    };

    const resetTimer = () => {
        setTimer(0, 0, 0);
        setOn(false);
    };

    const toggleTimer = () => {
        if (time != 0) {
            setOn((prev) => !prev);
            setReferenceTime(Date.now());
        }
    };

    const incHours = () => {
        const times = convertFromMillis(time);
        if (Number(times[0]) < 99 && !on) {
            let newHours = Number(times[0]) + 1;

            const newTime = convertToMillis(
                newHours,
                Number(times[1]),
                Number(times[2]),
            );
            setTime(newTime);
            setStrTime([...convertFromMillis(newTime)]);
        }
    };

    const decHours = () => {
        const times = convertFromMillis(time);

        if (Number(times[0]) > 0 && !on) {
            let newHours = Number(times[0]) - 1;

            const newTime = convertToMillis(
                newHours,
                Number(times[1]),
                Number(times[2]),
            );
            setTime(newTime);
            setStrTime([...convertFromMillis(newTime)]);
        }
    };

    const incMinutes = () => {
        const times = convertFromMillis(time);
        if (Number(times[1]) < 59 && !on) {
            let newMinutes = Number(times[1]) + 1;

            const newTime = convertToMillis(
                Number(times[0]),
                newMinutes,
                Number(times[2]),
            );
            setTime(newTime);
            setStrTime([...convertFromMillis(newTime)]);
        }
    };

    const decMinutes = () => {
        const times = convertFromMillis(time);
        if (Number(times[1]) > 0 && !on) {
            let newMinutes = Number(times[1]) - 1;

            const newTime = convertToMillis(
                Number(times[0]),
                newMinutes,
                Number(times[2]),
            );
            setTime(newTime);
            setStrTime([...convertFromMillis(newTime)]);
        }
    };

    const incSeconds = () => {
        const times = convertFromMillis(time);
        if (Number(times[2]) < 59 && !on) {
            let newSeconds = Number(times[2]) + 1;

            const newTime = convertToMillis(
                Number(times[0]),
                Number(times[1]),
                newSeconds,
            );
            setTime(newTime);
            setStrTime([...convertFromMillis(newTime)]);
        }
    };

    const decSeconds = () => {
        const times = convertFromMillis(time);
        if (Number(times[2]) > 0 && !on) {
            let newSeconds = Number(times[2]) - 1;

            const newTime = convertToMillis(
                Number(times[0]),
                Number(times[2]),
                newSeconds,
            );
            setTime(newTime);
            setStrTime([...convertFromMillis(newTime)]);
        }
    };

    useEffect(() => {
        if (on) {
            const countDownUntilZero = () => {
                setTime((prevTime) => {
                    if (prevTime <= 0) {
                        setOn(false);
                        return 0;
                    }

                    const now = Date.now();
                    const interval = now - referenceTime;
                    setReferenceTime(now);
                    setStrTime([...convertFromMillis(prevTime - interval)]);
                    return prevTime - interval;
                });
            };

            setTimeout(countDownUntilZero, INTERVAL_IN_MILISECONDS);
        }
    }, [time, on]);

    return {
        strTime,
        on,
        resetTimer,
        toggleTimer,
        incHours,
        decHours,
        incMinutes,
        decMinutes,
        incSeconds,
        decSeconds,
    };
}
