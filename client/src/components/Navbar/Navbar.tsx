import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
    faPalette,
    faClockRotateLeft,
    faCalculator,
    faBook,
    faCircleHalfStroke,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";
import { Link } from "@tanstack/react-router";

export default function Navbar() {
    const icons = [faBook, faCalculator, faClockRotateLeft, faPalette];
    const links = ["/organise", "/tools", "/activity", "/themes"];

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
        <div className="flex h-[100svh] h-[100vh] w-[10vw] flex-col bg-bg p-2 transition-colors">
            <div className="flex h-full flex-col py-2">
                {icons.map((icon: IconDefinition, i: number) => (
                    <div
                        key={i}
                        className="flex flex-1 items-center justify-center text-2xl"
                    >
                        <Link
                            to={links[i]}
                            className="text-text [&.active]:text-primary"
                        >
                            <FontAwesomeIcon
                                className="cursor-pointer transition-colors"
                                icon={icon}
                            />
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center py-2 text-lg">
                <FontAwesomeIcon
                    icon={faCircleHalfStroke}
                    className={twMerge(
                        "cursor-pointer text-text",
                        darkMode && "rotate-180",
                    )}
                    onClick={toggleLightDark}
                />
            </div>
        </div>
    );
}
