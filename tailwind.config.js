/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./App.tsx", "./components/**/*.tsx", "./screens/**/*.tsx"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {},
    },

    plugins: [],
};
