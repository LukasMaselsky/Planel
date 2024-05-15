import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function AboutItem({ children }: Props) {
    return (
        <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden rounded-xl bg-primary/30 p-2 text-lg">
            {children}
        </div>
    );
}
