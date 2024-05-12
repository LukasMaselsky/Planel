import { forwardRef, useState, useContext, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { ActivityContext } from "../../context/activityContext";
import { ActivityType } from "../../context/activityContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faDownload } from "@fortawesome/free-solid-svg-icons";

type Props = {
    handleDialog: () => void;
};

const formats = ["JSON", "CSV", "XML"] as const;
type Formats = (typeof formats)[number];

const JSONtoCSV = (data: ActivityType[]) => {
    const header = ["name", "date"] as const;
    const csv = [
        header.join(","), // header row first
        ...data.map((row) =>
            header.map((fieldName) => row[fieldName]).join(","),
        ),
    ].join("\r\n");

    return csv;
};

const JSONtoXML = (data: ActivityType[]) => {
    let xml = "<root>\n";
    const keys = ["name", "date"] as const;
    for (let i = 0; i < data.length; i++) {
        const obj = data[i];

        xml += `<row>\n`;
        keys.forEach((key) => {
            xml += `\t<${key}>`;
            xml += `${obj[key]}`;
            xml += `</${key}>\n`;
        });
        xml += `</row>\n`;
    }
    xml += "</root>";
    return xml;
};

const displayActivity = (data: ActivityType[] | undefined, format: Formats) => {
    if (!data) return "";
    if (data && data.length == 0) return "";

    let transformedData;
    if (format == "JSON") {
        transformedData = JSON.stringify(data, null, 4);
    } else if (format == "CSV") {
        transformedData = JSONtoCSV(data);
    } else {
        transformedData = JSONtoXML(data);
    }

    return transformedData;
};

const downloadActivity = (data: string, format: Formats) => {
    const a = document.createElement("a");

    let type = "";
    let ext = "";
    if (format == "JSON") {
        type = "application/json";
        ext = "json";
    } else if (format == "CSV") {
        type = "text/csv";
        ext = "csv";
    } else {
        data = '<?xml version="1.0" encoding="utf-8"?>' + data;
        type = "application/xml";
        ext = "xml";
    }

    a.href = URL.createObjectURL(new Blob([data], { type: type }));
    a.download = `activity.${ext}`;
    a.click();
    document.removeChild(a);
};

const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.log(err);
    }
};

const DownloadDialog = forwardRef<HTMLDialogElement, Props>(
    ({ handleDialog }, ref) => {
        const [selectedFormat, setSelectedFormat] = useState<Formats>("JSON");
        const [output, setOutput] = useState("");

        const activity = useContext(ActivityContext);

        useEffect(() => {
            if (activity) {
                setOutput(displayActivity(activity.completed, selectedFormat));
            }
        }, [selectedFormat]);

        return (
            <dialog
                ref={ref}
                className="absolute left-[50%] top-[50%] h-[75%] w-[75%] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-bg p-4 text-text"
                onClick={(e) => {
                    if (e.currentTarget === e.target) {
                        handleDialog();
                    }
                }}
            >
                <div className="flex h-full w-full flex-col overflow-hidden">
                    <div className="flex gap-2">
                        <div className="flex w-full items-center border-b border-text ">
                            {formats.map((format, i) => (
                                <div
                                    key={i}
                                    className={twMerge(
                                        "w-full p-2 text-center hover:cursor-pointer hover:bg-bg-vis",
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
                        <div
                            className="flex items-center gap-2 rounded-lg bg-bg-vis p-2 text-text hover:cursor-pointer"
                            onClick={() =>
                                downloadActivity(output, selectedFormat)
                            }
                        >
                            <FontAwesomeIcon icon={faDownload} />
                            <p>Download</p>
                        </div>
                    </div>
                    <div className="w-full flex-grow overflow-hidden pt-4">
                        <pre className="relative h-full overflow-y-auto overflow-x-hidden rounded-lg bg-bg-light p-2">
                            {output}
                            <FontAwesomeIcon
                                className="absolute right-2 top-2 text-3xl text-text hover:cursor-pointer"
                                icon={faCopy}
                                onClick={() => {
                                    copyToClipboard(output);
                                }}
                            />
                        </pre>
                    </div>
                </div>
            </dialog>
        );
    },
);

export default DownloadDialog;
