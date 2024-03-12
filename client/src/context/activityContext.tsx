import { ReactNode, createContext, useEffect, useState } from "react";

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
};

export const ActivityContext = createContext<ActivityContextType | null>(null);

export const ActivityContextProvider = ({ children }: Props) => {
    const [completed, setCompleted] = useState<ActivityType[]>([]);

    const getActivity = (): ActivityType[] => {
        const activity = localStorage.getItem("activity");
        if (activity) {
            return JSON.parse(activity);
        }
        return [];
    };

    const updateActivity = (newActivity: ActivityType) => {
        const activity = getActivity();
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
        setCompleted(getActivity());
    }, []);

    return (
        <ActivityContext.Provider
            value={{
                completed: completed,
                updateActivity: updateActivity,
            }}
        >
            {children}
        </ActivityContext.Provider>
    );
};
