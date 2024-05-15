import { useContext } from "react";
import { ActivityContext } from "../../context/activityContext";
import DownloadActivity from "../DownloadActivity/DownloadActivity";

export default function ActivityFeed() {
    const activity = useContext(ActivityContext);

    return (
        <div className="flex h-full flex-col overflow-y-auto overflow-x-hidden bg-bg px-4 py-2 text-text">
            <div className="flex items-center justify-between gap-2 py-2">
                <h1 className="text-ellipsis text-nowrap text-lg font-bold">
                    My activity
                </h1>
                <DownloadActivity />
            </div>
            <div>
                {activity?.completed.map((item, i) => (
                    <div key={i} className="flex flex-col">
                        <p>
                            You completed <b>{item.name}</b> on{" "}
                            <b>{item.date}</b>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
