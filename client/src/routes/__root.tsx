import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import Navbar from "../components/Navbar/Navbar";
import { QueryClient } from "react-query";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
    {
        component: () => (
            <div className="flex">
                <Navbar />
                <Outlet />
            </div>
        ),
    },
);
