import { createFileRoute } from "@tanstack/react-router";
import Clock from "../components/Clock/Clock";
import Calculator from "../components/Calculator/Calculator";

export const Route = createFileRoute("/tools")({
    component: Tools,
});

function Tools() {
    return (
        <div className="flex h-[100vh] w-full items-center bg-bg p-4 transition-colors">
            <Calculator />
            <Clock size={"300px"} />
        </div>
    );
}