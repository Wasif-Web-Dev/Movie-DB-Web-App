/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        theme: {
            extend: {
                screens: {
                    mobileS: "320px", // Small Mobile Screen
                    mobileM: "375px", // Medium Mobile Screen
                    mobileL: "425px", // Large Mobile Screen
                    mobileXL: "480px", // Custom breakpoint for extra-small screens
                    tabletS: "640px", // Modify existing breakpoint if needed
                    tabletM: "768px", // Medium screens (default)
                    Laptop: "1024px", // Large screens (default)
                    Llaptop: "1280px", // Extra-large screens (default)
                    "2xl": "1440px", // Custom breakpoint for even larger screens
                },
            },
        },
    },
    plugins: [],
};
