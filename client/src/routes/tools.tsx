import { createFileRoute } from "@tanstack/react-router";
import Clock from "../components/Clock/Clock";
import Calculator from "../components/Calculator/Calculator";
import Converter from "../components/Converter/Converter";

export const Route = createFileRoute("/tools")({
    component: Tools,
});

function Tools() {
    return (
        <div className="flex h-[100vh] w-full items-center justify-around bg-bg p-4 transition-colors">
            <Calculator />
            <Clock size={"300px"} />
            <Converter width={"300px"} />
        </div>
    );
}
