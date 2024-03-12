import { useContext } from "react";
import { ActivityContext } from "../../context/activityContext";

export default function ActivityFeed() {
    const activity = useContext(ActivityContext);

    return (
        <div className="flex h-full w-[50%] flex-col p-2">
            {activity?.completed.map((item, i) => (
                <div key={i} className="flex">
                    <p>
                        You completed <b>{item.name}</b> on <b>{item.date}</b>
                    </p>
                </div>
            ))}
        </div>
    );
}
