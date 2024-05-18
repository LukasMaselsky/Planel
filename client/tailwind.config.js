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
                    vis: "rgb(var(--color-bg-vis) / <alpha-value>)",
                },
                text: {
                    light: "rgb(var(--color-text-light) / <alpha-value>)",
                    DEFAULT: "rgb(var(--color-text) / <alpha-value>)",
                    dark: "rgb(var(--color-text-dark) / <alpha-value>)",
                },
                primary: {
                    DEFAULT:
                        "rgb(var(--color-primary-default) / <alpha-value>)",
                    50: "rgb(var(--color-primary-50) / <alpha-value>)",
                    100: "rgb(var(--color-primary-100) / <alpha-value>)",
                    200: "rgb(var(--color-primary-200) / <alpha-value>)",
                    300: "rgb(var(--color-primary-300) / <alpha-value>)",
                    400: "rgb(var(--color-primary-400) / <alpha-value>)",
                    500: "rgb(var(--color-primary-500) / <alpha-value>)",
                    600: "rgb(var(--color-primary-600) / <alpha-value>)",
                    700: "rgb(var(--color-primary-700) / <alpha-value>)",
                    800: "rgb(var(--color-primary-800) / <alpha-value>)",
                    900: "rgb(var(--color-primary-900) / <alpha-value>)",
                    950: "rgb(var(--color-primary-950) / <alpha-value>)",
                },
            },
        },
    },
    plugins: [],
};
