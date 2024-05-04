export const stringToDate = (date: string) => {
    const dateArr = date.split("/");
    return new Date(
        Number(dateArr[2]),
        Number(dateArr[1]) - 1,
        Number(dateArr[0]),
    );
};

export const dateToString = (date: Date) => {
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month =
        date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export const dateAddition = (date: Date, offset: number) => {
    if (offset == 0) return date;
    const newDate = new Date(new Date().setDate(date.getDate() + offset));
    return newDate;
};

export const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month =
        date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};
