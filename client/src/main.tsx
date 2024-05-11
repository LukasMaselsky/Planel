import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "react-query";
import { useContext } from "react";
import { ActivityContext } from "./context/activityContext";
import { ActivityType } from "./context/activityContext";
import "./App.css";
import "./index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({ routeTree, context: { queryClient } });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);

    root.render(<App />);
}

function App() {
    //* theme
    const theme = localStorage.getItem("theme");
    if (theme) {
        document.documentElement.setAttribute("data-theme", theme);
    }

    const lightOrDark = localStorage.getItem("mode");
    if (lightOrDark) {
        document.documentElement.setAttribute("data-light", lightOrDark);
    }

    const activity = useContext(ActivityContext);
    if (activity) {
        let savedActivity = localStorage.getItem("activity");
        if (savedActivity) {
            let savedActivityJSON: ActivityType[] = JSON.parse(savedActivity);
            activity.setCompleted(savedActivityJSON);
        }
    }

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}
