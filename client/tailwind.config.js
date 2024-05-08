/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: {
                    light: "rgb(var(--color-bg-light) / <alpha-value>)",
                    DEFAULT: "rgb(var(--color-bg) / <alpha-value>)",
                    dark: "rgb(var(--color-bg-dark) / <alpha-value>)",
                },
                text: {
                    light: "rgb(var(--color-text-light) / <alpha-value>)",
                    DEFAULT: "rgb(var(--color-text) / <alpha-value>)",
                    dark: "rgb(var(--color-text-dark) / <alpha-value>)",
                },
                primary: "rgb(var(--color-primary) / <alpha-value>)",
                secondary: "rgb(var(--color-secondary) / <alpha-value>)",
                accent: "rgb(var(--color-accent) / <alpha-value>)",
            },
        },
    },
    plugins: [],
};
