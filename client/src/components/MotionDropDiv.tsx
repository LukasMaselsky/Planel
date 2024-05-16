import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
    style?: string;
    duration?: number;
    startY?: number;
    endY?: number;
    exitY?: number;
    startX?: number;
    endX?: number;
    exitX?: number;
    startOpacity?: number;
    endOpacity?: number;
    multiple: boolean;
};

export default function MotionDropDiv({
    children,
    className,
    duration,
    startY,
    endY,
    exitY,
    startX,
    endX,
    exitX,
    startOpacity,
    endOpacity,
    multiple,
}: Props) {
    return !multiple ? (
        <AnimatePresence>
            <motion.div
                className={className}
                initial={{
                    y: startY ? `${startY}` : "-100%",
                    x: startX ? `${startX}` : "0%",
                    opacity: startOpacity ? startOpacity : 0,
                }}
                animate={{
                    y: endY ? `${endY}` : "0%",
                    x: endX ? `${endX}` : "0%",
                    opacity: endOpacity ? endOpacity : 1,
                }}
                transition={{ duration: duration ? duration : 1 }}
                exit={{
                    y: exitY ? `${exitY}` : "0%",
                    x: exitX ? `${exitX}` : "100%",
                    opacity: startOpacity ? startOpacity : 0,
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    ) : (
        <motion.div
            className={className}
            initial={{
                y: startY ? `${startY}` : "-100%",
                x: startX ? `${startX}` : "0%",
                opacity: startOpacity ? startOpacity : 0,
            }}
            animate={{
                y: endY ? `${endY}` : "0%",
                x: endX ? `${endX}` : "0%",
                opacity: endOpacity ? endOpacity : 1,
            }}
            transition={{ duration: duration ? duration : 1 }}
            exit={{
                y: exitY ? `${exitY}` : "0%",
                x: exitX ? `${exitX}` : "100%",
                opacity: startOpacity ? startOpacity : 0,
            }}
        >
            {children}
        </motion.div>
    );
}
