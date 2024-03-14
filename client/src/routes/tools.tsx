import { createFileRoute } from "@tanstack/react-router";
import Clock from "../components/Clock/Clock";
import Todo from "../components/Todo/Todo";

export const Route = createFileRoute("/tools")({
    component: Tools,
});

function Tools() {
    return (
        <div className="flex h-[100vh] w-full items-center bg-bg p-4 transition-colors">
            <Todo height={"300px"} width={"300px"} />
            <Clock size={"300px"} />
        </div>
    );
}
