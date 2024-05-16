import OtterImage from "./OtterImage";
import { motion } from "framer-motion";

type Props = {
    component: string;
    index: number;
};

export default function Empty({ component, index }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex w-full grow flex-col items-center justify-center gap-4 p-2 text-lg font-medium text-text"
        >
            <p className="text-center">No {component}!</p>
            <OtterImage width={"40%"} random={true} index={index} />
        </motion.div>
    );
}

// TODO: stagger text
