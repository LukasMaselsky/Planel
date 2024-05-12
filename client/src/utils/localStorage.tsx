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
    return key == "classes" ? {} : [];
};
