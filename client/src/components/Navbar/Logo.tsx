import icon from "../../assets/icon.png";
import text from "../../assets/logo-text.png";
import { useState } from "react";

export default function Logo() {
    const [dark, setDark] = useState(
        localStorage.getItem("mode") == "dark" ? true : false,
    );

    return (
        <div className="flex w-full items-center gap-2">
            <img src={icon} className="h-6"></img>
            <img
                src={text}
                style={{ filter: dark ? "invert(100%)" : "invert(0%)" }}
                className="h-4"
            ></img>
        </div>
    );
}

// TODO: fix
