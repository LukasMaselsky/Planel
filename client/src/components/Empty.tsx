import OtterImage from "./OtterImage";

type Props = {
    component: string;
};

export default function Empty({ component }: Props) {
    return (
        <div className="flex w-full grow flex-col items-center justify-center gap-4 p-2 text-lg font-medium text-text">
            <p className="text-center">No {component}!</p>
            <OtterImage width={"40%"} />
        </div>
    );
}
