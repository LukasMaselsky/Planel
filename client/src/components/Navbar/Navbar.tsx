import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
    faPalette,
    faClockRotateLeft,
    faCalculator,
    faBook,
    faCircleHalfStroke,
    faGear,
    faBars,
    faX,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";
import { Link } from "@tanstack/react-router";
import { capitalise } from "../../utils/capitalise";

export default function Navbar() {
    const icons = [faBook, faCalculator, faClockRotateLeft, faPalette];
    const links = ["/organise", "/tools", "/activity", "/themes"];
    const [navOpen, setNavOpen] = useState(false);

    const toggleNav = () => {
        setNavOpen((prev) => !prev);
    };

    return (
        <div
            className={twMerge(
                "flex h-[100svh] h-[100vh] flex-shrink-[0] flex-col bg-bg py-2 pl-6 transition-all",
                navOpen ? "w-[180px] " : "w-[80px] ",
            )}
        >
            <div className={twMerge("flex items-center py-2 text-2xl")}>
                <FontAwesomeIcon
                    className="cursor-pointer text-text"
                    onClick={toggleNav}
                    icon={navOpen ? faX : faBars}
                />
            </div>
            <div className="flex h-full flex-col py-2">
                {icons.map((icon: IconDefinition, i: number) => (
                    <div
                        key={i}
                        className={twMerge(
                            "flex flex-1 items-center justify-start text-2xl",
                        )}
                    >
                        <Link
                            to={links[i]}
                            className="flex items-center gap-4 font-light text-text [&.active]:font-medium [&.active]:text-primary"
                        >
                            <FontAwesomeIcon
                                className="cursor-pointer transition-colors"
                                icon={icon}
                            />
                            {navOpen && (
                                <p className="transition-all">
                                    {capitalise(links[i].slice(1))}
                                </p>
                            )}
                        </Link>
                    </div>
                ))}
            </div>
            <div className={twMerge("flex items-center gap-2 py-2 text-2xl")}>
                <FontAwesomeIcon
                    icon={faGear}
                    className="cursor-pointer text-text"
                />
                {/* 
                <FontAwesomeIcon
                    icon={faCircleHalfStroke}
                    className={twMerge(
                        "cursor-pointer text-text",
                        darkMode && "rotate-180",
                    )}
                    onClick={toggleLightDark}
                />
                */}
            </div>
        </div>
    );
}
