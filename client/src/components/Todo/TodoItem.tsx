import { useState } from "react";

interface Props {
    id: number;
    text: string;
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, text: string) => void;
}

export default function TodoItem({ id, text, deleteTodo, updateTodo }: Props) {
    const [todoText, setTodoText] = useState<string>(text);

    // TODO: get prev value if multiple updates and set to that instead of prop text value from when page was oroginally loaded
    const handleUpdate = () => {
        if (todoText == "") {
            setTodoText(text);
        } else {
            if (todoText != text) {
                updateTodo(id, todoText);
            }
        }
    };

    return (
        <div className="flex items-center gap-2 overflow-hidden border-b p-2">
            <input
                onClick={() => deleteTodo(id)}
                type="checkbox"
                className="h-5 shrink-0 grow-0 basis-5 cursor-pointer appearance-none bg-gray-300 outline-0 after:relative after:left-[37%] after:top-[15%] after:hidden after:h-[50%] after:w-[30%] after:rotate-45 after:border-b-2 after:border-l-0 after:border-r-2 after:border-t-0 after:border-black after:content-[''] checked:bg-green-300 checked:after:block"
            ></input>
            <input
                type="text"
                className="flex grow items-center px-2 text-black focus:outline-none"
                value={todoText}
                onBlur={handleUpdate}
                onChange={(e) => setTodoText(e.target.value)}
            ></input>
        </div>
    );
}

// TODO: fix input starting value scrolling to end instead of start (input.scrollLeft)
