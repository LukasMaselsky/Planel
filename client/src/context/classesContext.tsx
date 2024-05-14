import { ReactNode, createContext, useEffect, useState } from "react";
import { getItem } from "../utils/localStorage";

type Props = {
    children: ReactNode;
};

type ClassesContextType = {
    classes: Class;
    setClasses: React.Dispatch<React.SetStateAction<Class>>;
    updateClass: (old: string, n: string) => void;
    addClass: (c: string) => void;
    createClass: (c: string) => void;
    removeClass: (c: string) => void;
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

    const createClass = (c: string) => {
        let cs: Class = getItem("classes");
        if (!(c in cs)) {
            cs[c] = 0;
        }
        localStorage.setItem("classes", JSON.stringify(cs));
        setClasses(cs);
    };

    const addClass = (c: string) => {
        let cs: Class = getItem("classes");
        cs[c] = (cs[c] || 0) + 1;

        localStorage.setItem("classes", JSON.stringify(cs));
        setClasses(cs);
    };

    const removeClass = (c: string) => {
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
        removeClass(old);
    };

    useEffect(() => {
        setClasses(getItem("classes"));
    }, []);

    return (
        <ClassesContext.Provider
            value={{
                classes: classes,
                addClass: addClass,
                removeClass: removeClass,
                updateClass: updateClass,
                createClass: createClass,
                setClasses: setClasses,
            }}
        >
            {children}
        </ClassesContext.Provider>
    );
};
