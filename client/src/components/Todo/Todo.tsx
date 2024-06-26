import { useQuery } from "react-query";
import TodoItem from "./TodoItem";
import { useState } from "react";
import { useContext } from "react";
import { ActivityContext } from "../../context/activityContext";
import { getCurrentDate } from "../../utils/date";
import { getItem } from "../../utils/localStorage";
import Empty from "../Empty";
import { AnimatePresence } from "framer-motion";
import Error from "../Error";
import Loading from "../Loading";
import OrganiseWrapper from "../OrganiseWrapper";

type Props = {
    width: string;
    height: string;
};

type Todo = {
    id: number;
    text: string;
};

export default function Todo({ width, height }: Props) {
    const [inputValue, setInputValue] = useState<string>("");

    const activity = useContext(ActivityContext);

    const addTodo = () => {
        if (inputValue != "") {
            let todos: Todo[] = getItem("todos");
            const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
            const todo = { id: id, text: inputValue };
            setInputValue("");

            localStorage.setItem("todos", JSON.stringify([...todos, todo]));
            refetch(); // manually call react query refresh
        }
    };

    const deleteTodo = (id: number) => {
        let todos: Todo[] = getItem("todos");
        let newTodos = todos.filter((todo) => todo.id != id);
        localStorage.setItem("todos", JSON.stringify(newTodos));

        //* add to activity
        let todo = todos.filter((todo) => todo.id == id);
        if (activity && todo) {
            activity.updateActivity({
                name: todo[0].text,
                date: getCurrentDate(),
                type: "todo",
            });
        }

        refetch();
    };

    const updateTodo = (id: number, text: string) => {
        let todos: Todo[] = getItem("todos");
        const todo = todos.find((todo) => todo.id == id);
        if (todo) {
            todo.text = text;
        }

        localStorage.setItem("todos", JSON.stringify(todos));
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryFn: () => getItem("todos"),
        queryKey: ["todos"],
        staleTime: Infinity,
        cacheTime: 0,
    });

    if (isLoading)
        return (
            <OrganiseWrapper width={width} height={height}>
                <Loading />
            </OrganiseWrapper>
        );

    if (error)
        return (
            <OrganiseWrapper width={width} height={height}>
                <Error />
            </OrganiseWrapper>
        );

    return (
        <div
            className="flex flex-col overflow-y-auto overflow-x-hidden rounded-lg border-[1px] border-text p-4"
            style={{ height: height, width: width }}
        >
            <input
                className="w-full rounded-lg border-none bg-bg-vis p-2 text-text focus:outline-none"
                placeholder="Add todo"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
                onKeyUp={(e) => e.key === "Enter" && addTodo()}
            ></input>
            <AnimatePresence>
                {data &&
                    data.map((todo: Todo) => (
                        <TodoItem
                            key={todo.id}
                            text={todo.text}
                            id={todo.id}
                            deleteTodo={deleteTodo}
                            updateTodo={updateTodo}
                        />
                    ))}
            </AnimatePresence>
            {data && data.length == 0 ? (
                <Empty component={"todos"} index={0} />
            ) : null}
        </div>
    );
}
