import { useState } from "react";
import { useEffect } from "react";

interface Time {
    hours: number;
    minutes: number;
    seconds: number;
}

export default function useTime() {
    const [time, setTime] = useState<Time>({
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds(),
    });

    // Logic, computation to update time (which is side-effect) should put inside useEffect
    useEffect(() => {
        // Running side-effect when component mounted (componentDidMount)
        const myInterval = setInterval(() => {
            const today = new Date();
            setTime({
                hours: today.getHours(),
                minutes: today.getMinutes(),
                seconds: today.getSeconds(),
            });
        }, 1000);

        // Clear side-effect when component unmount (componentWillUnmount)
        return () => {
            clearInterval(myInterval);
        };
    }, []);

    return time;
}
