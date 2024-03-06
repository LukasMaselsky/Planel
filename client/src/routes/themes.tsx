import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/themes")({
    component: Themes,
});

function Themes() {
    return <div>Themes</div>;
}
