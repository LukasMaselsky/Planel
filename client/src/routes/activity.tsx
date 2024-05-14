import { createFileRoute } from "@tanstack/react-router";
import ActivityFeed from "../components/ActivityFeed/ActivityFeed";
import ActivityGraph from "../components/ActivityGraph/ActivityGraph";

export const Route = createFileRoute("/activity")({
    component: Activity,
});

function Activity() {
    return (
        <div className="relative flex h-[100vh] w-full items-center justify-around overflow-hidden bg-bg p-4 transition-colors">
            <ActivityGraph />
            <ActivityFeed />
        </div>
    );
}
