import { forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
type Props = {
    handleDialog: () => void;
};

const formats = ["JSON", "CSV", "XML"] as const;
type Formats = (typeof formats)[number];

const DownloadDialog = forwardRef<HTMLDialogElement, Props>(
    ({ handleDialog }, ref) => {
        const [selectedFormat, setSelectedFormat] = useState<Formats>("JSON");

        return (
            <dialog
                ref={ref}
                className="absolute left-[50%] top-[50%] h-[75%] w-[75%] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-bg p-4"
                onClick={(e) => {
                    if (e.currentTarget === e.target) {
                        handleDialog();
                    }
                }}
            >
                <div className="flex h-full w-full flex-col">
                    <div className="flex w-full items-center border-b border-text ">
                        {formats.map((format, i) => (
                            <div
                                className={twMerge(
                                    "hover:bg-bg-dark w-full p-2 text-center hover:cursor-pointer",
                                    format == selectedFormat
                                        ? "bg-bg-light"
                                        : "bg-bg",
                                )}
                                onClick={() => setSelectedFormat(format)}
                            >
                                {format}
                            </div>
                        ))}
                    </div>
                    <div className="h-full w-full p-2"></div>
                </div>
            </dialog>
        );
    },
);

export default DownloadDialog;
