type TextProps = "light" | "dark";
type BgProps = "light" | "dark" | "vis";
type PrimaryProps =
    | 50
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
    | 950;

export const getTextColor = (modifier?: TextProps) => {
    const root = document.querySelector(":root");
    let color = "";
    if (root) {
        color = getComputedStyle(root).getPropertyValue(
            "--color-text" + (modifier ? `-${modifier}` : ""),
        );
        color = formatColor(color);
    }
    return color;
};

export const getBgColor = (modifier?: BgProps) => {
    const root = document.querySelector(":root");
    let color = "";
    if (root) {
        color = getComputedStyle(root).getPropertyValue(
            "--color-bg" + (modifier ? `-${modifier}` : ""),
        );
        color = formatColor(color);
    }
    return color;
};

export const getPrimaryColor = (modifier?: PrimaryProps) => {
    const root = document.querySelector(":root");
    let color = "";
    if (root) {
        color = getComputedStyle(root).getPropertyValue(
            "--color-primary" + (modifier ? `-${modifier}` : "-default"),
        );
        color = formatColor(color);
    }
    return color;
};

const formatColor = (color: string) => {
    return `rgb(${color.split(" ").join(",")})`;
};
