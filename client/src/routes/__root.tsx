import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import Navbar from "../components/Navbar/Navbar";
import { QueryClient } from "react-query";
import { ActivityContextProvider } from "../context/activityContext";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
    {
        component: () => (
            <ActivityContextProvider>
                <div className="flex overflow-y-hidden">
                    <Navbar />
                    <Outlet />
                </div>
            </ActivityContextProvider>
        ),
    },
);
