import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";
import AboutItem from "./AboutItem";
import AboutPoint from "./AboutPoint";
import OtterImage from "../OtterImage";
import { themes } from "../../routes/themes";
import { motion } from "framer-motion";
import AboutTools from "./AboutTools";

export default function AboutPage() {
    return (
        <div className="flex h-[100vh] w-full items-center bg-bg p-4 text-text transition-colors">
            <div className="relative grid h-full w-full grid-cols-3 grid-rows-2 gap-1">
                <AboutItem>
                    <h1 className="text-xl font-bold transition">Organise</h1>
                    <AboutPoint index={0}>
                        <p>
                            See everything related to your{" "}
                            <span className="font-medium">classes</span>
                        </p>
                    </AboutPoint>
                    <AboutPoint index={1}>
                        <p>
                            Keep track of your{" "}
                            <span className="font-medium">grades</span> and your{" "}
                            <span className="font-medium">schedule</span>
                        </p>
                    </AboutPoint>
                    <AboutPoint index={2}>
                        <p>
                            Add <span className="font-medium">assignments</span>{" "}
                            and <span className="font-medium">todos</span> to
                            remind yourself
                        </p>
                    </AboutPoint>
                </AboutItem>
                <AboutItem>
                    <h1 className="text-xl font-bold transition">Tools</h1>
                    <AboutTools />
                </AboutItem>
                <AboutItem>
                    <p className="select-none transition">Activity</p>
                </AboutItem>
                <AboutItem>
                    <h1 className="text-xl font-bold transition">Themes</h1>
                    <div className="flex h-full w-full items-end gap-6 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
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
                            {Object.keys(themes).map(
                                (theme: string, i: number) => (
                                    <motion.div
                                        key={i}
                                        className="rounded-xl p-2"
                                        style={{
                                            backgroundColor: themes[theme],
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 2,
                                            delay: i * 0.2,
                                        }}
                                    ></motion.div>
                                ),
                            )}
                        </div>
                    </div>
                </AboutItem>

                <AboutItem>
                    <h1 className="text-xl font-bold transition">About</h1>
                    <div className="flex h-full w-full flex-col justify-end">
                        <p>
                            Created by{" "}
                            <a
                                href="https://github.com/LukasMaselsky"
                                target="_blank"
                                className="font-medium"
                            >
                                Lukas Maselsky
                            </a>
                        </p>
                        <p>
                            Icons from{" "}
                            <a
                                href="https://fontawesome.com/"
                                target="_blank"
                                className="font-medium"
                            >
                                Font Awesome
                            </a>
                        </p>
                        <p>
                            Illustrations from{" "}
                            <a
                                href="https://stock.adobe.com/"
                                target="_blank"
                                className="font-medium"
                            >
                                Adobe Stock
                            </a>
                        </p>
                    </div>
                </AboutItem>
                <AboutItem>
                    <p className="select-none transition">About</p>
                </AboutItem>
            </div>
        </div>
    );
}
