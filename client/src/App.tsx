import "./App.css";
//import Converter from "./components/Converter/Converter";
import Calendar from "./components/Calendar/Calendar";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Calendar />
        </QueryClientProvider>
    );
}

export default App;
