export const stringToDate = (date: string) => {
    const dateArr = date.split("/");
    return new Date(
        Number(dateArr[2]),
        Number(dateArr[1]) - 1,
        Number(dateArr[0]),
    );
};

export const getDayDiff = (a: Date, b: Date) => {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / MS_PER_DAY);
};

export const dayWithSuffix = (day: string) => {
    const number = Number(day);

    if (number > 3 && number < 21) return `${number}th`;
    switch (number % 10) {
        case 1:
            return `${number}st`;
        case 2:
            return `${number}nd`;
        case 3:
            return `${number}rd`;
        default:
            return `${number}th`;
    }
};

export const monthDigitsToWord = (month: string) => {
    const monthNum = Number(month) - 1;
    const d = new Date();
    d.setMonth(monthNum);
    const m = d.toLocaleString("default", { month: "short" });
    return m;
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

export const dateAddition = (date: Date, days: number) => {
    if (days == 0) return date;
    const newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() + days);

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
