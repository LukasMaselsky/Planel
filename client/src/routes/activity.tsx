import { createFileRoute } from "@tanstack/react-router";
import ActivityFeed from "../components/ActivityFeed/ActivityFeed";
import ActivityGraph from "../components/ActivityGraph/ActivityGraph";
import DownloadActivity from "../components/DownloadActivity/DownloadActivity";

export const Route = createFileRoute("/activity")({
    component: Activity,
});

function Activity() {
    return (
        <div className="relative flex h-[100vh] w-full items-center bg-bg p-4 transition-colors">
            <ActivityGraph />
            <DownloadActivity />
        </div>
    );
}
