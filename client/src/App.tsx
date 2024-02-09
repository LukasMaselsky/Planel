import "./App.css";
import Schedule from "./components/Schedule/Schedule";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Schedule />
        </QueryClientProvider>
    );
}

export default App;
