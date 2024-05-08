import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import DownloadDialog from "./DownloadDialog";

export default function DownloadActivity() {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const handleDialog = () => {
        const isOpen = dialogRef.current?.open;
        if (isOpen) {
            dialogRef.current?.close();
        } else {
            dialogRef.current?.showModal();
        }
    };

    return (
        <>
            <div
                className="flex items-center gap-2 rounded-lg bg-gray-200 p-2 hover:cursor-pointer"
                onClick={handleDialog}
            >
                <FontAwesomeIcon icon={faDownload} />
                <p>Download</p>
            </div>
            <DownloadDialog ref={dialogRef} handleDialog={handleDialog} />
        </>
    );
}

// TODO: Formats: JSON, CSV, HTML table, XML?
