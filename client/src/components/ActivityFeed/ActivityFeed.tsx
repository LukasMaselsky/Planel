import { useContext, useEffect, useState } from "react";
import { ActivityContext, ActivityType } from "../../context/activityContext";
import DownloadActivity from "../DownloadActivity/DownloadActivity";
import OrganiseWrapper from "../OrganiseWrapper";
import Empty from "../Empty";
import ActivityItem from "./ActivityItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowUpWideShort,
    faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";

export default function ActivityFeed() {
    const [data, setData] = useState<ActivityType[]>([]);
    const [descending, setDescending] = useState(true);
    const activity = useContext(ActivityContext);

    const reorder = () => {
        setDescending((prev) => !prev);
        setData((prev) => prev.reverse());
    };

    useEffect(() => {
        if (activity) {
            let reversed = [...activity.completed].reverse();
            setData(descending ? reversed : activity.completed);
        }
    }, [activity]);

    return (
        <div className="flex h-full w-[400px] flex-col bg-bg px-4 py-2 text-text">
            <div className="flex items-center justify-between gap-2 py-2">
                <h1 className="text-ellipsis text-nowrap text-lg font-bold">
                    My activity
                </h1>
                {data.length != 0 && (
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon
                            className="text-2xl text-text"
                            onClick={reorder}
                            icon={
                                descending
                                    ? faArrowDownWideShort
                                    : faArrowUpWideShort
                            }
                        />
                        <DownloadActivity />
                    </div>
                )}
            </div>
            <div className="relative flex h-full w-full flex-col gap-2 overflow-y-auto overflow-x-hidden pb-2">
                {data.map((item, i) => (
                    <ActivityItem
                        key={i}
                        name={item.name}
                        date={item.date}
                        type={item.type}
                        index={i}
                    />
                ))}
                {data.length == 0 ? (
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
