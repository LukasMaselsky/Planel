import OtterImage from "../OtterImage";
import { themes } from "../../routes/themes";
import { motion } from "framer-motion";

export default function AboutThemes() {
    return (
        <div className="flex h-full w-full items-end gap-6 overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex h-full w-full items-end"
            >
                <OtterImage
                    width={"100%"}
                    height={"100%"}
                    index={3}
                    random={false}
                />
            </motion.div>

            <div className="relative grid h-full w-full grid-cols-2 grid-rows-4 gap-1">
                {Object.keys(themes).map((theme: string, i: number) => (
                    <motion.div
                        key={i}
                        className="rounded-xl"
                        style={{
                            backgroundColor: themes[theme],
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.9,
                            delay: i * 0.1,
                        }}
                    ></motion.div>
                ))}
            </div>
        </div>
    );
}
