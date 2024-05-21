import { useContext } from "react";
import { ActivityContext } from "../../context/activityContext";
import DownloadActivity from "../DownloadActivity/DownloadActivity";
import OrganiseWrapper from "../OrganiseWrapper";
import Empty from "../Empty";
import ActivityItem from "./ActivityItem";

export default function ActivityFeed() {
    const activity = useContext(ActivityContext);

    return (
        <div className="flex h-full w-[400px] flex-col bg-bg px-4 py-2 text-text">
            <div className="flex items-center justify-between gap-2 py-2">
                <h1 className="text-ellipsis text-nowrap text-lg font-bold">
                    My activity
                </h1>
                <DownloadActivity />
            </div>
            <div className="relative flex h-full w-full flex-col gap-2 overflow-y-auto overflow-x-hidden pb-2">
                {activity?.completed.map((item, i) => (
                    <ActivityItem
                        key={i}
                        name={item.name}
                        date={item.date}
                        type={item.type}
                        index={i}
                    />
                ))}
                {activity && activity.completed.length == 0 ? (
                    <OrganiseWrapper
                        width={`100%`}
                        height={`100%`}
                        border={false}
                    >
                        <Empty component="activity" index={1} />
                    </OrganiseWrapper>
                ) : null}
            </div>
        </div>
    );
}
