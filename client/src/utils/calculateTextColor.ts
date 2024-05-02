export function calculateTextColor(color: string) {
    if (color == "") return "black";
    let rgb = color.match(/[.?\d]+/g);

    if (rgb === null) return "black";

    const brightness = Math.round(
        (parseInt(rgb[0]) * 299 +
            parseInt(rgb[1]) * 587 +
            parseInt(rgb[2]) * 114) /
            1000,
    );
    return brightness > 125 ? "black" : "white";
}
