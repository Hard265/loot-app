/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./App.tsx", "./components/**/*.tsx", "./screens/**/*.tsx"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "rgb(var(--color-primary) / <alpha-value>)",
                background: "rgb(var(--color-background) / <alpha-value>)",
                text: "rgb(var(--color-text) / <alpha-value>)",
            },
        },
    },

    plugins: [
        ({ addBase }) =>
            addBase({
                ":root": {
                    "--color-primary": "97 95 255",
                    "--color-background": "255 255 255",
                    "--color-text": "0 0 0",
                },
                "@media (prefers-color-scheme: dark)": {
                    ":root": {
                        "--color-primary": "124 134 255",
                        "--color-background": "0 0 0",
                        "--color-text": "255 255 255",
                    },
                },
            }),
    ],
};
