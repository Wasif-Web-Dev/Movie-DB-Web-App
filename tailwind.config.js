/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

    theme: {
        extend: {
            screens: {
                mobileS: "340px", // Small Mobile Screen
                mobileM: "380px", // Medium Mobile Screen
                mobileL: "425px", // Large Mobile Screen
                mobileXL: "480px", // Custom breakpoint for extra-small screens
                tabletS: "640px", // Modify existing breakpoint if needed
                tabletM: "770px", // Medium screens (default)
                Laptop: "1064px", // Large screens (default)
                LaptopL: "1280px", // Extra-large screens (default)
                "2xl": "1440px", // Custom breakpoint for even larger screens
            },
        },
    },

    plugins: [],
};
