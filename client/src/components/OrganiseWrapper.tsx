import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    width: string;
    height: string;
    border?: boolean;
};

export default function OrganiseWrapper({
    children,
    width,
    height,
    border,
}: Props) {
    return (
        <div
            className="relative flex flex-col gap-2 rounded-lg border-text bg-bg p-1 text-text"
            style={{
                height: height,
                width: width,
                borderWidth: border != undefined && !border ? "0" : "1px",
            }}
        >
            {children}
        </div>
    );
}
