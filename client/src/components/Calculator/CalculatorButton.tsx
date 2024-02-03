import { SyntheticEvent } from "react";

interface Props {
    sign: string;
    onClick: (e: SyntheticEvent) => void;
    off: boolean;
}

export default function CalculatorButton({ sign, onClick, off }: Props) {
    return (
        <button
            className="flex h-12 w-12 select-none items-center justify-center rounded-md bg-red-300 hover:cursor-pointer hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onClick}
            disabled={off && sign != "C"}
        >
            {sign}
        </button>
    );
}
