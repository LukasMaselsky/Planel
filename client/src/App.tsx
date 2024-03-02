import "./App.css";
//import Converter from "./components/Converter/Converter";
//import Calendar from "./components/Calendar/Calendar";
//import Clock from "./components/Clock/Clock";
import Assignments from "./components/Assignments/Assignments";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Assignments />
        </QueryClientProvider>
    );
}

export default App;
