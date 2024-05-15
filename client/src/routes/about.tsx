import { createFileRoute } from "@tanstack/react-router";
import AboutPage from "../components/About/AboutPage";

export const Route = createFileRoute("/about")({
    component: About,
});

function About() {
    return (
        <div className="relative flex h-[100vh] w-full items-center justify-around overflow-hidden bg-bg p-4 transition-colors">
            <AboutPage />
        </div>
    );
}
