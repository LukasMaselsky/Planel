import { FormEvent, useEffect, useState, useRef, RefObject } from "react";
import configureMeasurements from "convert-units";
import allMeasures, {
    AllMeasures,
    AllMeasuresSystems,
    AllMeasuresUnits,
} from "convert-units/definitions/all";
import { NumeralUnits, NumeralConverters } from "./Numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightArrowLeft,
    faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { z } from "zod";

type ExtraMeasures = "numeral";
const ExtraMeasuresArr = ["numeral"];
type ExtraMeasuresUnits = NumeralUnits;

type CombinedMeasures = AllMeasures | ExtraMeasures;
type CombinedMeasuresUnits = AllMeasuresUnits | ExtraMeasuresUnits;

type Units = {
    [key in CombinedMeasures]?: CombinedMeasuresUnits[];
};

type unit = {
    from: CombinedMeasuresUnits;
    to: CombinedMeasuresUnits;
};

type Props = {
    width: string;
};

export default function Converter({ width }: Props) {
    const convert = configureMeasurements<
        AllMeasures,
        AllMeasuresSystems,
        AllMeasuresUnits
    >(allMeasures);

    const [category, setCategory] = useState<CombinedMeasures>("length");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState<string>("");
    const [unit, setUnit] = useState<unit>({
        from: "mm",
        to: "mm",
    });

    const fromRef: RefObject<HTMLInputElement> = useRef(null);
    const toRef: RefObject<HTMLInputElement> = useRef(null);

    const units: Units = {
        length: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
        area: ["mm2", "cm2", "m2", "km2", "in2", "ft2", "mi2", "ac"],
        mass: ["mg", "g", "kg", "oz", "lb"],
        volume: [
            "m3",
            "ft3",
            "ml",
            "l",
            "tsp",
            "Tbs",
            "fl-oz",
            "cup",
            "pnt",
            "qt",
            "gal",
        ],
        temperature: ["C", "F", "K"],
        time: ["ms", "s", "min", "h", "d", "week", "month", "year"],
        speed: ["m/s", "km/h", "mm/h", "mph", "knot", "ft/s", "ft/min", "in/h"],
        digital: ["b", "B", "KB", "MB", "GB", "TB"],
        voltage: ["V", "mV", "kV"],
        current: ["A", "mA", "kA"],
        power: ["W", "kW", "MW", "GW"],
        frequency: [
            "mHz",
            "Hz",
            "kHz",
            "MHz",
            "GHz",
            "THz",
            "rpm",
            "deg/s",
            "rad/s",
        ],
        energy: [
            "Ws",
            "Wm",
            "Wh",
            "mWh",
            "kWh",
            "MWh",
            "GWh",
            "J",
            "kJ",
            "MJ",
            "GJ",
            "cal",
        ],
        angle: ["deg", "rad"],
        numeral: ["hex", "dec", "bin", "oct"], // hex, binary not included with package
    };

    const transform = z.string().transform((value) => {
        if (category == "numeral" && unit.from != "dec") {
            if (unit.from == "bin") {
                return value.replace(/[^0-1]/g, "");
            }
            if (unit.from == "hex") {
                return value.replace(/[^0-9A-Fa-f]/g, "");
            }

            if (unit.from == "oct") {
                return value.replace(/[^0-7]/g, "");
            }
        }

        return value.replace(/[^0-9]/g, ""); // Use 'g' flag to remove all non-numeric characters
    });

    const handleCategoryChange = (category: CombinedMeasures) => {
        setCategory(category);
        if (category in units) {
            const arr = units[category] as CombinedMeasuresUnits[];
            setUnit({ from: arr[0], to: arr[0] });
        }
    };

    const handleUnitChange = (
        key: "to" | "from",
        unit: CombinedMeasuresUnits,
    ) => {
        const arr = units[category];
        if (arr) {
            setUnit((prev) => ({
                ...prev,
                [key]: arr[arr.indexOf(unit)],
            }));
        }
    };

    useEffect(() => {
        if (ExtraMeasuresArr.includes(category)) {
            // of type ExtraMeasures
            handleNumeralConvert(from);
        } else {
            handleConvert(from);
        }
    }, [unit]);

    const handleNumeralConvert = (value: string) => {
        //const num = Number(value);
        const conversion = NumeralConverters[unit.from as NumeralUnits](
            value,
            unit.to as NumeralUnits,
        );
        if (conversion) {
            setTo(conversion);
        }
        return conversion;
    };

    const handleConvert = (value: string) => {
        const num = Number(value);
        const conversion = convert(num)
            .from(unit.from as AllMeasuresUnits)
            .to(unit.to as AllMeasuresUnits);
        setTo(String(conversion));
        return conversion;
    };

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        const validatedValue = transform.parse(value);
        setFrom(validatedValue);

        if (ExtraMeasuresArr.includes(category)) {
            // of type ExtraMeasures
            handleNumeralConvert(validatedValue);
        } else {
            handleConvert(validatedValue);
        }
    };

    const swap = () => {
        setUnit((prev) => ({
            from: prev.to,
            to: prev.from,
        }));
    };

    const copyToClipboard = async (ref: RefObject<HTMLInputElement>) => {
        if (ref.current) {
            try {
                await navigator.clipboard.writeText(ref.current.value);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div
            className="flex flex-col gap-4 bg-gray-100 p-4"
            style={{ width: width }}
        >
            <div className="flex justify-center">
                <select
                    className="h-full rounded-lg bg-white px-2 py-1 text-center"
                    value={category}
                    onChange={(e) =>
                        handleCategoryChange(e.target.value as keyof Units)
                    }
                >
                    {Object.keys(units).map((key, i: number) => (
                        <option key={i}>{key}</option>
                    ))}
                </select>
            </div>

            <div className="flex w-full flex-col gap-4">
                <div className="flex w-full items-center overflow-hidden rounded-lg bg-white">
                    <input
                        ref={fromRef}
                        type="text"
                        className="w-full px-2 py-1 focus:outline-none"
                        value={from}
                        onChange={handleInput}
                        placeholder="From"
                    ></input>
                    <FontAwesomeIcon
                        className="cursor-pointer px-2"
                        onClick={() => {
                            copyToClipboard(fromRef);
                        }}
                        icon={faCopy}
                    />
                    <select
                        className="h-full bg-white py-1"
                        value={unit.from}
                        onChange={(e) =>
                            handleUnitChange(
                                "from",
                                e.target.value as CombinedMeasuresUnits,
                            )
                        }
                    >
                        {(units[category] as CombinedMeasuresUnits[]).map(
                            (aUnit, i: number) => (
                                <option key={i}>{aUnit}</option>
                            ),
                        )}
                    </select>
                </div>
                <div className="flex justify-center">
                    <FontAwesomeIcon
                        className="rotate-90 cursor-pointer text-xl"
                        onClick={swap}
                        icon={faArrowRightArrowLeft}
                    />
                </div>
                <div className="flex w-full items-center overflow-hidden rounded-lg bg-white">
                    <input
                        ref={toRef}
                        disabled
                        className="w-full px-2 py-1"
                        type="text"
                        placeholder="To"
                        value={to}
                    ></input>
                    <FontAwesomeIcon
                        className="cursor-pointer px-2"
                        onClick={() => {
                            copyToClipboard(toRef);
                        }}
                        icon={faCopy}
                    />
                    <select
                        className="h-full bg-white py-1"
                        value={unit.to}
                        onChange={(e) =>
                            handleUnitChange(
                                "to",
                                e.target.value as CombinedMeasuresUnits,
                            )
                        }
                    >
                        {(units[category] as CombinedMeasuresUnits[]).map(
                            (aUnit, i: number) => (
                                <option key={i}>{aUnit}</option>
                            ),
                        )}
                    </select>
                </div>
            </div>
        </div>
    );
}
