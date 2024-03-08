import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/activity")({
    component: Activity,
});

function Activity() {
    return <div className="flex h-[100vh] w-full items-center bg-bg p-4"></div>;
}
