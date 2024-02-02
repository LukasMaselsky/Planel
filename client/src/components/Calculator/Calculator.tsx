import CalculatorButton from "./CalculatorButton";

export default function Calculator() {
    const clear = () => {};

    const plusMinus = () => {};

    const percent = () => {};

    const number = () => {};

    const divide = () => {};

    const multiply = () => {};

    const subtract = () => {};

    const add = () => {};

    const equals = () => {};

    const squareRoot = () => {};

    const decimal = () => {};

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
            sign: "√",
            onClick: squareRoot,
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
            onClick: divide,
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
            onClick: multiply,
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
            onClick: subtract,
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
            onClick: add,
        },
    ];

    return (
        <div className="flex h-[400px] w-[250px] rounded-xl bg-gray-200 p-4">
            <div className="flex flex-col gap-4">
                <div className="flex grow rounded-md bg-red-300"></div>
                <div className="grid grid-cols-4 grid-rows-5 gap-2">
                    {buttons.map((obj, index) => (
                        <CalculatorButton
                            key={index}
                            sign={obj.sign}
                            onClick={obj.onClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
