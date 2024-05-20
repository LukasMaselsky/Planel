import { SyntheticEvent } from "react";
interface Props {
    sign: string;
    onClick: (e: SyntheticEvent) => void;
    off: boolean;
    textColor: string;
}

export default function CalculatorButton({
    sign,
    onClick,
    off,
    textColor,
}: Props) {
    return (
        <button
            className="flex h-12 w-12 select-none items-center justify-center rounded-md bg-primary hover:cursor-pointer hover:bg-primary-300 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ color: textColor }}
            onClick={onClick}
            disabled={off && sign != "C"} // if divide by 0
        >
            {sign}
        </button>
    );
}
