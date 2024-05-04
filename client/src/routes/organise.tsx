import { createFileRoute } from "@tanstack/react-router";
import Assignments from "../components/Assignments/Assignments";
import Todo from "../components/Todo/Todo";
import Schedule from "../components/Schedule/Schedule";

export const Route = createFileRoute("/organise")({
    component: Organise,
});

function Organise() {
    return (
        <div className="flex h-[100vh] w-full items-center bg-bg p-4 transition-colors">
            <Assignments height={"400px"} width={"300px"} />
            <Todo height={"400px"} width={"300px"} />
            <Schedule height={"400px"} width={"300px"} />
        </div>
    );
}
