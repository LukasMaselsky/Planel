import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const Route = createFileRoute("/themes")({
    component: Themes,
});

type ThemesDict = {
    [key: string]: string;
};

function Themes() {
    let getTheme = localStorage.getItem("theme");
    if (!getTheme) {
        getTheme = "crimson";
    }

    const [currentTheme, setCurrentTheme] = useState(getTheme);

    const themes: ThemesDict = {
        crimson: "rgb(204, 49, 40)",
        ocean: "rgb(112, 138, 255)",
        forest: "rgb(134, 185, 39)",
        sun: "rgb(248, 196, 98)",
        dusk: "rgb(143, 0, 140)",
        cocoa: "rgb(123, 61, 61)",
        blossom: "rgb(255, 145, 175)",
        amber: "rgb(219, 124, 38)",
    };

    const handleClick = (theme: string) => {
        setCurrentTheme(theme);
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    };

    return (
        <div className="flex h-[100vh] w-full items-center bg-bg p-4 transition-colors">
            <div className="grid h-full w-full grid-cols-4 grid-rows-2 gap-1">
                {Object.keys(themes).map((theme: string, i: number) => (
                    <div
                        key={i}
                        className="cursor-pointer rounded-xl p-2 text-lg"
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
                    </div>
                ))}
            </div>
        </div>
    );
}
