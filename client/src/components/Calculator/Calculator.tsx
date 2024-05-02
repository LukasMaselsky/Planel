import CalculatorButton from "./CalculatorButton";
import { getTheme } from "../../utils/getTheme";
import { SyntheticEvent, useState } from "react";
import { calculateTextColor } from "../../utils/calculateTextColor";

interface Calc {
    sign: string;
    history: number | string;
    number: number | string;
    result: number | string;
    divideByZero: boolean;
}

export default function Calculator() {
    const [calc, setCalc] = useState<Calc>({
        sign: "",
        history: 0,
        number: 0,
        result: 0,
        divideByZero: false,
    });

    const clear = (e: SyntheticEvent) => {
        e.preventDefault();
        setCalc({
            sign: "",
            history: 0,
            number: 0,
            result: 0,
            divideByZero: false,
        });
    };

    const plusMinus = (e: SyntheticEvent) => {
        e.preventDefault();
        setCalc({
            ...calc,
            number: calc.number ? Number(calc.number) * -1 : 0,
            result: calc.result ? Number(calc.result) * -1 : 0,
        });
    };

    const percent = (e: SyntheticEvent) => {
        // all this does is convert inputted num to decimal
        e.preventDefault();
        let num = calc.number ? parseFloat(String(calc.number)) : 0;

        setCalc({
            ...calc,
            number: (num /= Math.pow(100, 1)),
        });
    };

    const number = (e: SyntheticEvent) => {
        e.preventDefault();
        const input = e.target as HTMLElement;
        const value = input.innerHTML;
        if (String(calc.number).length < 16) {
            setCalc({
                ...calc,
                number:
                    calc.number === 0 && value === "0"
                        ? "0"
                        : Number(calc.number) % 1 === 0
                          ? Number(calc.number + value)
                          : calc.number + value,
            });
        }
    };

    const compute = (sign: string): number | string => {
        const num = Number(calc.number);
        const res = Number(calc.result);

        const firstOperation = String(calc.history).slice(0, 1) == "0";
        let newResult: number | string = 0;
        if (firstOperation) return num;

        if (sign == "+") {
            newResult = res + num;
        } else if (sign == "-") {
            newResult = res - num;
        } else if (sign == "x") {
            newResult = res * num;
        } else if (sign == "÷") {
            newResult = res / num;
            if (newResult == Infinity) {
                newResult = "Can't divide by 0";
            }
        }

        return newResult;
    };

    const sign = (e: SyntheticEvent) => {
        e.preventDefault();
        const input = e.target as HTMLElement;
        const value = input.innerHTML;

        // remove "="
        const history = String(calc.history).includes("=")
            ? String(calc.history).slice(0, String(calc.history).length - 1) +
              calc.sign
            : String(calc.history);

        const newResult = compute(calc.sign == "" ? value : calc.sign); // previous sign if mixing signs inputted
        //! this doesn't work when using =

        if (newResult == "Can't divide by 0") {
            setCalc({
                ...calc,
                history: newResult,
                result: newResult,
                divideByZero: true,
            });
            return;
        }

        if (calc.number !== 0) {
            setCalc({
                ...calc,
                sign: value,
                history:
                    calc.history != 0
                        ? history + String(calc.number) + value
                        : calc.number + value,
                result: newResult,
                number: 0,
            });
        }
    };

    const equals = (e: SyntheticEvent) => {
        e.preventDefault();

        const newResult = compute(calc.sign);

        if (newResult == "Can't divide by 0") {
            console.log("here");
            setCalc({
                ...calc,
                history: newResult,
                result: newResult,
                divideByZero: true,
            });
            return;
        }

        // remove "="
        const history = String(calc.history).includes("=")
            ? String(calc.history).slice(0, String(calc.history).length - 1) +
              calc.sign
            : String(calc.history);

        setCalc({
            ...calc,
            history:
                calc.sign == ""
                    ? calc.number
                    : history +
                      (Number(calc.number) == 0
                          ? String(calc.result)
                          : String(calc.number)) +
                      "=",
            result: newResult,
            number: 0,
        });
    };

    const backspace = (e: SyntheticEvent) => {
        e.preventDefault();

        const numString = String(calc.number);
        setCalc({
            ...calc,
            number: Number(
                numString.slice(0, numString.length - 1) == "-"
                    ? 0
                    : numString.slice(0, numString.length - 1),
            ),
            result: 0,
        });
    };

    const decimal = (e: SyntheticEvent) => {
        e.preventDefault();
        const input = e.target as HTMLElement;
        const value = input.innerHTML;

        setCalc({
            ...calc,
            number: !calc.number.toString().includes(".")
                ? calc.number + value
                : calc.number,
        });
    };

    const buttons = [
        {
            sign: "C",
            onClick: clear,
        },
        {
            sign: "+/-",
            onClick: plusMinus,
        },
        {
            sign: "%",
            onClick: percent,
        },
        {
            sign: "D",
            onClick: backspace,
        },
        {
            sign: "7",
            onClick: number,
        },
        {
            sign: "8",
            onClick: number,
        },
        {
            sign: "9",
            onClick: number,
        },
        {
            sign: "÷",
            onClick: sign,
        },
        {
            sign: "4",
            onClick: number,
        },
        {
            sign: "5",
            onClick: number,
        },
        {
            sign: "6",
            onClick: number,
        },
        {
            sign: "x",
            onClick: sign,
        },
        {
            sign: "1",
            onClick: number,
        },
        {
            sign: "2",
            onClick: number,
        },
        {
            sign: "3",
            onClick: number,
        },
        {
            sign: "-",
            onClick: sign,
        },
        {
            sign: "0",
            onClick: number,
        },
        {
            sign: ".",
            onClick: decimal,
        },
        {
            sign: "=",
            onClick: equals,
        },
        {
            sign: "+",
            onClick: sign,
        },
    ];

    const color = getTheme("primary");
    const textColor = calculateTextColor(color);

    return (
        <div className="flex h-[400px] w-[250px] rounded-xl bg-gray-200 p-4">
            <div className="flex flex-col gap-4">
                <div
                    className="flex grow flex-col rounded-md p-2"
                    style={{ backgroundColor: color, color: textColor }}
                >
                    <div className="text-base font-light">{calc.history}</div>
                    <div className="text-lg">
                        {!(calc.number == 0) ? calc.number : calc.result}
                    </div>
                </div>
                <div className="grid grid-cols-4 grid-rows-5 gap-2">
                    {buttons.map((obj, index) => (
                        <CalculatorButton
                            key={index}
                            sign={obj.sign}
                            onClick={obj.onClick}
                            off={calc.divideByZero}
                            color={color}
                            textColor={textColor}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

//TODO: 53-5= +5 doesnt work, - remains
