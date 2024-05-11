import { ReactNode, createContext, useEffect, useState } from "react";
import { getItem } from "../utils/localStorage";

type Props = {
    children: ReactNode;
};

export type ActivityType = {
    name: string;
    date: string;
};

type ActivityContextType = {
    completed: ActivityType[];
    updateActivity: (newActivity: ActivityType) => void;
    setCompleted: React.Dispatch<React.SetStateAction<ActivityType[]>>;
};

export const ActivityContext = createContext<ActivityContextType | null>(null);

export const ActivityContextProvider = ({ children }: Props) => {
    const [completed, setCompleted] = useState<ActivityType[]>([]);

    const updateActivity = (newActivity: ActivityType) => {
        const activity = getItem("activity");
        if (activity.length > 0) {
            const updatedActivity = [...activity, newActivity];
            setCompleted(updatedActivity);
            localStorage.setItem("activity", JSON.stringify(updatedActivity));
        } else {
            setCompleted([newActivity]);
            localStorage.setItem("activity", JSON.stringify([newActivity]));
        }
    };

    useEffect(() => {
        setCompleted(getItem("activity"));
    }, []);

    return (
        <ActivityContext.Provider
            value={{
                completed: completed,
                updateActivity: updateActivity,
                setCompleted: setCompleted,
            }}
        >
            {children}
        </ActivityContext.Provider>
    );
};
