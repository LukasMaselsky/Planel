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
    ocean: "rgb(102, 130, 255)",
    crimson: "rgb(213, 51, 42)",
    forest: "rgb(122, 168, 36)",
    sun: "rgb(248, 199, 109)",
    dusk: "rgb(153, 0, 150)",
    cocoa: "rgb(137, 67, 67)",
    blossom: "rgb(255, 102, 143)",
    amber: "rgb(219, 124, 36)",
};

const getDefaultTheme = () => {
    let theme = localStorage.getItem("theme");
    if (!theme) {
        theme = "ocean";
    }
    return theme;
};

function Themes() {
    const [currentTheme, setCurrentTheme] = useState(getDefaultTheme());

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
