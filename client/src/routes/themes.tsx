import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export const Route = createFileRoute("/themes")({
    component: Themes,
});

type ThemesDict = {
    [key: string]: string;
};

export const themes: ThemesDict = {
    crimson: "rgb(204, 49, 40)",
    ocean: "rgb(112, 138, 255)",
    forest: "rgb(134, 185, 39)",
    sun: "rgb(248, 196, 98)",
    dusk: "rgb(143, 0, 140)",
    cocoa: "rgb(123, 61, 61)",
    blossom: "rgb(255, 145, 175)",
    amber: "rgb(219, 124, 38)",
};

function Themes() {
    let getTheme = localStorage.getItem("theme");
    if (!getTheme) {
        getTheme = "crimson";
    }

    const [currentTheme, setCurrentTheme] = useState(getTheme);

    const handleClick = (theme: string) => {
        setCurrentTheme(theme);
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    };

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("mode") == "dark" ? true : false,
    );

    const toggleLightDark = () => {
        setDarkMode((prev) => {
            const lightOrDark = !prev ? "dark" : "light";
            document.documentElement.setAttribute("data-light", lightOrDark);
            localStorage.setItem("mode", lightOrDark);

            return !prev;
        });
    };

    return (
        <div className="flex h-[100vh] w-full items-center bg-bg p-4 transition-colors">
            <div className="relative grid h-full w-full grid-cols-4 grid-rows-2 gap-1">
                {Object.keys(themes).map((theme: string, i: number) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="flex cursor-pointer items-center justify-center overflow-x-hidden rounded-xl p-2 text-lg"
                        style={{ backgroundColor: themes[theme] }}
                        onClick={() => handleClick(theme)}
                    >
                        <p
                            className={twMerge(
                                "select-none transition",
                                currentTheme == theme &&
                                    "font-bold underline decoration-2",
                            )}
                        >
                            {theme.toUpperCase()}
                        </p>
                    </motion.div>
                ))}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    style={{ containerType: "inline-size" }}
                    className="absolute left-[50%] top-[50%] flex aspect-square w-[clamp(100px,_20%,_300px)] translate-x-[-50%] translate-y-[-50%] items-center justify-center rounded-[50%] bg-bg transition-colors"
                >
                    <FontAwesomeIcon
                        icon={faCircleHalfStroke}
                        className={twMerge(
                            "absolute cursor-pointer text-[95cqw] text-text transition-colors",
                        )}
                        onClick={toggleLightDark}
                    />
                </motion.div>
            </div>
        </div>
    );
}
