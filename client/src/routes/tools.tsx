import { createFileRoute } from "@tanstack/react-router";
import Clock from "../components/Clock/Clock";

export const Route = createFileRoute("/tools")({
    component: Tools,
});

function Tools() {
    return <div className="flex h-[100vh] w-full items-center bg-bg p-4"></div>;
}
