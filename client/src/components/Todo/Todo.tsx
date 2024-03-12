import { useQuery } from "react-query";
import TodoItem from "./TodoItem";
import { useState } from "react";
import { useContext } from "react";
import { ActivityContext } from "../../context/activityContext";
import { getCurrentDate } from "../../utils/getCurrentDate";

export default function Todo() {
    const [inputValue, setInputValue] = useState<string>("");

    const activity = useContext(ActivityContext);

    const getTodos = (): { id: number; text: string }[] => {
        let todos = localStorage.getItem("todos");
        if (todos) {
            return JSON.parse(todos);
        }
        return [];
    };

    const addTodo = () => {
        if (inputValue != "") {
            let todos = getTodos();
            const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
            const todo = { id: id, text: inputValue };
            setInputValue("");

            localStorage.setItem("todos", JSON.stringify([...todos, todo]));
            refetch(); // manually call react query refresh
        }
    };

    const deleteTodo = (id: number) => {
        let todos = getTodos();
        let newTodos = todos.filter((todo) => todo.id != id);
        localStorage.setItem("todos", JSON.stringify(newTodos));

        //* add to activity
        let todo = todos.filter((todo) => todo.id == id);
        if (activity && todo) {
            activity.updateActivity({
                name: todo[0].text,
                date: getCurrentDate(),
            });
        }

        //! add delay/animation here
        setTimeout(function () {
            refetch();
        }, 500);
    };

    const updateTodo = (id: number, text: string) => {
        let todos = getTodos();
        const todo = todos.find((todo) => todo.id == id);
        if (todo) {
            todo.text = text;
        }

        localStorage.setItem("todos", JSON.stringify(todos));
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryFn: getTodos,
        queryKey: ["todos"],
        staleTime: Infinity,
        cacheTime: 0,
    });

    if (isLoading) return <div>Loading</div>;

    if (error) return <div>Error</div>;

    return (
        <div className="flex h-[50vh] w-[300px] flex-col overflow-y-auto rounded-lg border-[1px] border-gray-400 p-4">
            <input
                className="w-full rounded-lg border-none bg-gray-100 p-2 focus:outline-none"
                placeholder="Add todo"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
                onKeyUp={(e) => e.key === "Enter" && addTodo()}
            ></input>
            {data &&
                data.map((todo: { id: number; text: string }) => (
                    <TodoItem
                        key={todo.id}
                        text={todo.text}
                        id={todo.id}
                        deleteTodo={deleteTodo}
                        updateTodo={updateTodo}
                    />
                ))}
            {data && data.length == 0 ? (
                <div className="flex w-full grow items-center justify-center p-2 text-text">
                    No todos yet
                </div>
            ) : null}
        </div>
    );
}
