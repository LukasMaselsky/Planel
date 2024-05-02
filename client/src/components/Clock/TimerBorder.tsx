import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";
import { TimerState } from "./Clock";
import { getTheme } from "../../utils/getTheme";

type Props = {
    size: number;
    strokeWidth: number;
    duration: number;
    timerState: TimerState;
};

export default function TimerBorder({
    size,
    strokeWidth,
    duration,
    timerState,
}: Props) {
    const radius = size / 2 - strokeWidth;

    const controls = useAnimation();

    const color = getTheme("primary");

    const startAnimation = () => {
        controls.start({
            strokeDashoffset: -2 * Math.PI * radius,
            transition: {
                duration: duration,
                ease: "linear",
            },
        });
    };

    const stopAnimation = () => {
        controls.stop();
    };

    const resetAnimation = () => {
        controls.start({
            strokeDashoffset: 0,
            transition: { duration: 0 },
        });
    };

    useEffect(() => {
        if (timerState == "start") {
            startAnimation();
        } else if (timerState == "stop") {
            stopAnimation();
        } else if (timerState == "reset") {
            resetAnimation();
        }
    }, [timerState]);

    return (
        <motion.svg
            width={`${size}`}
            height={`${size}`}
            className="absolute z-[0] rotate-[270deg]"
            initial={{ strokeDashoffset: 0 }}
            animate={controls}
        >
            <motion.circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={2 * Math.PI * radius}
            ></motion.circle>
        </motion.svg>
    );
}
