import { SyntheticEvent } from "react";
interface Props {
    sign: string;
    onClick: (e: SyntheticEvent) => void;
    off: boolean;
    color: string;
    textColor: string;
}

export default function CalculatorButton({
    sign,
    onClick,
    off,
    color,
    textColor,
}: Props) {
    return (
        <button
            className="flex h-12 w-12 select-none items-center justify-center rounded-md hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: color, color: textColor }}
            onClick={onClick}
            disabled={off && sign != "C"} // if divide by 0
        >
            {sign}
        </button>
    );
}
