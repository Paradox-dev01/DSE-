/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // enable class-based dark mode
    theme: {
        extend: {
        colors: {
            blue: {
            50: "#eff6ff",
            700: "#1d4ed8",
            900: "#1e3a8a",
            },
        },
        },
    },
    safelist: [
        "bg-blue-50",
        "border-blue-200",
        "dark:bg-blue-900",
        "dark:border-blue-700",
    ],
    plugins: [],
};
