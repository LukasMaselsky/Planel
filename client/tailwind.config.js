/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "rgb(var(--color-bg) / <alpha-value>)",
                text: "rgb(var(--color-text) / <alpha-value>)",
                primary: "rgb(var(--color-primary) / <alpha-value>)",
                secondary: "rgb(var(--color-secondary) / <alpha-value>)",
                accent: "rgb(var(--color-accent) / <alpha-value>)",
            },
        },
    },
    plugins: [],
};
