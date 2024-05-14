import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    width: string;
    height: string;
};

export default function OrganiseWrapper({ children, width, height }: Props) {
    return (
        <div
            className="relative flex flex-col gap-2 rounded-lg border-[1px] border-text bg-bg p-1"
            style={{ height: height, width: width }}
        >
            {children}
        </div>
    );
}
