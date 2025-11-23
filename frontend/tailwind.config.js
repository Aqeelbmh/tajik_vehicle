/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#0D2C54",
                "primary-dark": "#0a2240", // Darker variant of primary for the finance calculator
                "secondary": "#FFC107",
                "accent": "#FF7A00", // Construction Orange accent color
                "background-light": "#F4F7F9",
                "background-dark": "#101622",
                "text-light": "#333333",
                "text-dark": "#F4F7F9",
                "text-muted-light": "#616f89",
                "text-muted-dark": "#a0aec0",
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    }
}