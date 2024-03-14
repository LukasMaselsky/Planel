import { createFileRoute } from "@tanstack/react-router";
import Assignments from "../components/Assignments/Assignments";

export const Route = createFileRoute("/organise")({
    component: Organise,
});

function Organise() {
    return (
        <div className="flex h-[100vh] w-full items-center bg-bg p-4 transition-colors">
            <Assignments height={"400px"} width={"300px"} />
        </div>
    );
}
