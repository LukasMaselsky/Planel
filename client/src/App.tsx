import "./App.css";
import Grades from "./components/Grades/Grades";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Grades />
        </QueryClientProvider>
    );
}

export default App;
