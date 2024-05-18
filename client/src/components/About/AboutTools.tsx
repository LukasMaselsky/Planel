import { useState } from "react";
import OtterImage from "../OtterImage";
import { motion } from "framer-motion";

export default function AboutTools() {
    const [dark, setDark] = useState(
        localStorage.getItem("mode") == "dark" ? true : false,
    );

    return (
        <div className="flex h-full w-full items-center justify-center overflow-hidden">
            <motion.div
                className="h-full w-full p-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <OtterImage
                    width={"100%"}
                    height={"100%"}
                    index={dark ? 5 : 4}
                    random={false}
                />
            </motion.div>
        </div>
    );
}
