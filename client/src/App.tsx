import "./App.css";
import Clock from "./components/Clock/Clock";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Clock />
        </QueryClientProvider>
    );
}

export default App;
