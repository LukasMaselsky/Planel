type Props = "bg" | "text" | "primary" | "secondary" | "accent";

export function getTheme(type: Props) {
    const root = document.querySelector(":root");
    let color = "";
    if (root) {
        color = getComputedStyle(root).getPropertyValue(`--color-${type}`);
        color = `rgb(${color.split(" ").join(",")})`;
    }
    return color;
}
