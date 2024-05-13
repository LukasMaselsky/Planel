type Props = {
    component: string;
};

export default function Empty({ component }: Props) {
    return (
        <div className="flex w-full grow items-center justify-center p-2 text-lg font-medium text-text">
            <p className="text-center">No {component}!</p>
        </div>
    );
}
