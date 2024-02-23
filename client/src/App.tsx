import "./App.css";
import Converter from "./components/Converter/Converter";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Converter />
        </QueryClientProvider>
    );
}

export default App;
