interface Props {
    sign: string;
    onClick: () => void;
}

export default function CalculatorButton({ sign, onClick }: Props) {
    return (
        <div
            className="flex h-12 w-12 select-none items-center justify-center rounded-md bg-red-300 hover:cursor-pointer"
            onClick={onClick}
        >
            {sign}
        </div>
    );
}
