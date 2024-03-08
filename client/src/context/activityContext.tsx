import { ReactNode, createContext, useState } from "react";

type Props = {
    children: ReactNode;
};

export type ActivityType = {
    name: string;
    date: string;
};

type ActivityContextType = {
    completed: ActivityType[];
    setCompleted: React.Dispatch<React.SetStateAction<ActivityType[]>>;
};

export const ActivityContext = createContext<ActivityContextType | null>(null);

export const ActivityContextProvider = ({ children }: Props) => {
    const [completed, setCompleted] = useState<ActivityType[]>([]);

    return (
        <ActivityContext.Provider
            value={{
                completed: completed,
                setCompleted: setCompleted,
            }}
        >
            {children}
        </ActivityContext.Provider>
    );
};
