import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
    faPalette,
    faClockRotateLeft,
    faCalculator,
    faBook,
    faCircleInfo,
    faBars,
    faX,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";
import { Link } from "@tanstack/react-router";
import { capitalise } from "../../utils/capitalise";
import logo from "../../assets/logo.png";
import { motion } from "framer-motion";

export const links = ["/organise", "/tools", "/activity", "/themes", "/about"];

export const icons = [
    faBook,
    faCalculator,
    faClockRotateLeft,
    faPalette,
    faCircleInfo,
];

export default function Navbar() {
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
            <div className={twMerge("flex items-center gap-4 py-2 text-2xl")}>
                <FontAwesomeIcon
                    className="cursor-pointer text-text"
                    onClick={toggleNav}
                    icon={navOpen ? faX : faBars}
                />
                {navOpen ? (
                    <div className="w-full">
                        <img src={logo} className="h-6"></img> // TODO: dark
                        mode
                    </div>
                ) : null}
            </div>
            <div className="flex h-full flex-col py-2">
                {icons.map((icon: IconDefinition, i: number) => (
                    <motion.div
                        key={i}
                        className={twMerge(
                            "flex flex-1 items-center justify-start text-2xl",
                        )}
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
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
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
