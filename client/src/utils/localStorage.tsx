type Keys =
    | "activity"
    | "assignments"
    | "todos"
    | "schedule"
    | "classes"
    | "grades";

export const getItem = (key: Keys) => {
    const values = localStorage.getItem(key);
    if (values) {
        return JSON.parse(values);
    }
    return [];
};

export const setClass = (c: string) => {
    const classes: string[] = getItem("classes");
    if (!classes.includes(c)) {
        localStorage.setItem("classes", JSON.stringify([...classes, c]));
    }
};

export const deleteClass = (c: string) => {
    let classes: string[] = getItem("assignments");

    if (classes) {
        classes = classes.filter((item) => item != c);
    }

    localStorage.setItem("classes", JSON.stringify(classes));
};
