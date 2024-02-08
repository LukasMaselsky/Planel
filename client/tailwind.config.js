/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "#F7F3F5",
                text: "#0A121F",
                primary: "#2B3A67",
                secondary: "#2B3A67",
                accent: "#3ABECF",
            },
        },
    },
    plugins: [],
};
