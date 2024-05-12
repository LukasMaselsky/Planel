import { ReactNode, createContext, useEffect, useState } from "react";
import { getItem } from "../utils/localStorage";

type Props = {
    children: ReactNode;
};

type ClassesContextType = {
    classes: Class;
    setClasses: React.Dispatch<React.SetStateAction<Class>>;
    addClass: (c: string) => void;
    deleteClass: (c: string) => void;
    updateClass: (old: string, n: string) => void;
};

export type Class = {
    [key: string]: number;
};

export const ClassesContext = createContext<ClassesContextType | null>(null);

/*
Stored in kv pairs, number just means how many "items" e.g. grade, schedule slot or assignment there are
Number is only used for tracking this and updating classes component
*/

export const ClassesContextProvider = ({ children }: Props) => {
    const [classes, setClasses] = useState<Class>({});

    const addClass = (c: string) => {
        let cs: Class = getItem("classes");
        cs[c] = (cs[c] || 0) + 1;

        localStorage.setItem("classes", JSON.stringify(cs));
        setClasses(cs);
    };

    const deleteClass = (c: string) => {
        let cs: Class = getItem("classes");
        if (c in cs) {
            if (cs[c] > 1) {
                cs[c] = cs[c] - 1;
            } else {
                delete cs[c];
            }
        }

        setClasses(cs);
        localStorage.setItem("classes", JSON.stringify(cs));
    };

    const updateClass = (old: string, n: string) => {
        addClass(n);
        deleteClass(old);
    };

    useEffect(() => {
        setClasses(getItem("classes"));
    }, []);

    return (
        <ClassesContext.Provider
            value={{
                classes: classes,
                addClass: addClass,
                deleteClass: deleteClass,
                updateClass: updateClass,
                setClasses: setClasses,
            }}
        >
            {children}
        </ClassesContext.Provider>
    );
};
