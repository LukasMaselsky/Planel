import { createFileRoute } from "@tanstack/react-router";
import Assignments from "../components/Assignments/Assignments";
import Todo from "../components/Todo/Todo";
import Classes from "../components/Classes/Classes";
import Schedule from "../components/Schedule/Schedule";
import Grades from "../components/Grades/Grades";

export const Route = createFileRoute("/organise")({
    component: Organise,
});

function Organise() {
    return (
        <div className="flex h-[100vh] w-full items-center gap-1 overflow-hidden bg-bg p-4 transition-colors">
            <Assignments height={"100%"} width={"100%"} />
            <Grades height={"100%"} width={"100%"} />
            <Schedule height={"100%"} width={"100%"} />
            <div className="relative flex h-full w-full flex-col gap-1">
                <Classes height={"50%"} width={"100%"} />
                <Todo height={"50%"} width={"100%"} />
            </div>
        </div>
    );
}
