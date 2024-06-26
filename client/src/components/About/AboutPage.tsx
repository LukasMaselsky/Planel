import AboutItem from "./AboutItem";
import AboutPoint from "./AboutPoint";
import AboutTools from "./AboutTools";
import AboutThemes from "./AboutThemes";
import OtterImage from "../OtterImage";
import { motion } from "framer-motion";
import AboutActivity from "./AboutActivity";
import { useState } from "react";

export default function AboutPage() {
    const [dark, _] = useState(
        localStorage.getItem("mode") == "dark" ? true : false,
    );

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
                    <AboutTools dark={dark} />
                </AboutItem>
                <AboutItem>
                    <h1 className="text-xl font-bold transition">Activity</h1>
                    <AboutActivity width={300} height={200} dark={dark} />
                </AboutItem>
                <AboutItem>
                    <h1 className="text-xl font-bold transition">Themes</h1>
                    <AboutThemes />
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
                    <motion.div
                        className="flex h-full w-full items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="w-[90%]">
                            <OtterImage
                                width={"100%"}
                                height={"100%"}
                                random={false}
                                index={6}
                            />
                        </div>
                    </motion.div>
                </AboutItem>
            </div>
        </div>
    );
}
