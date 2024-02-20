import { FormEvent, useState } from "react";

interface Units {
    [key: string]: string[];
}

export default function Converter() {
    const [category, setCategory] = useState("length");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [unit, setUnit] = useState({
        from: "mm",
        to: "mm",
    });

    const units: Units = {
        length: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
        area: ["mm2", "cm2", "m2", "km2", "sq in", "sq ft", "sq mi", "ac"],
        mass: ["mg", "g", "kg", "oz", "lb"],
        volume: ["mL", "L", "tsp", "tbsp", "fl oz", "cup", "pt", "qt", "gal"],
        temperature: ["C", "F", "K"],
        time: ["ms", "s", "min", "h", "d", "wk", "mo", "y"],
        //speed: [],
        digital: ["bits", "B", "KB", "MB", "GB", "TB", "PB"],
        //voltage: [],
        //current: [],
        power: ["W", "kW", "MW", "GW", "TW", "PW"],
        //energy: [],
        angle: ["deg", "rad"],
        //numeral: [], // hex, binary not included with package
    };

    const handleCategoryChange = (category: string) => {
        setCategory(category);
        setUnit({ from: units[category][0], to: units[category][0] });
    };

    const handleUnitChange = (key: string, unit: string) => {
        const arr = units[category];
        setUnit((prev) => ({
            ...prev,
            [key]: arr[arr.indexOf(unit)],
        }));
    };

    const handleConvert = (value: string) => {
        const num = Number(value);
        //const conversion =
        //setTo(conversion);
    };

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        setFrom(value);
        handleConvert(value);
    };

    return (
        <div>
            <select>
                {Object.keys(units).map((category) => (
                    <option onClick={() => handleCategoryChange(category)}>
                        {category}
                    </option>
                ))}
            </select>

            <div className="flex gap-4">
                <div>
                    <input
                        type="text"
                        value={from}
                        onChange={handleInput}
                        placeholder="From"
                    ></input>
                    <select>
                        {units[category].map((unit) => (
                            <option
                                onClick={() => handleUnitChange("from", unit)}
                            >
                                {unit}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <input disabled type="text" placeholder="To"></input>
                    <select>
                        {units[category].map((unit) => (
                            <option
                                onClick={() => handleUnitChange("to", unit)}
                            >
                                {unit}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
