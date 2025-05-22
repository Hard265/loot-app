/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./App.tsx",
        "./layouts/**/*.tsx",
        "./components/**/*.tsx",
        "./components/ui/*.tsx",
        "./screens/**/*.tsx",
        "./providers/**/*.tsx",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "rgb(var(--color-primary) / <alpha-value>)",
                background: "rgb(var(--color-background) / <alpha-value>)",
                secondary: "rgb(var(--color-secondary) / <alpha-value>)",
                text: "rgb(var(--color-text) / <alpha-value>)",
                error: "rgb(var(--color-error) / <alpha-value>)",
                border: "rgb(var(--color-border) / <alpha-value>)",
                "foreground-primary":
                    "rgb(var(--color-foreground-primary) / <alpha-value>)",
            },
        },
    },
    plugins: [
        ({ addBase }) =>
            addBase({
                ":root": {
                    "--color-primary": "97 95 255",
                    "--color-background": "255 255 255",
                    "--color-secondary": "255 255 255",
                    "--color-text": "0 0 0",
                    "--color-error": "239 68 68",
                    "--color-gray": "209 213 219",
                    "--color-foreground-primary": "255 255 255",
                },
                "@media (prefers-color-scheme: dark)": {
                    ":root": {
                        "--color-primary": "124 134 255",
                        "--color-background": "0 0 0",
                        "--color-secondary": "38 38 38",
                        "--color-text": "255 255 255",
                        "--color-error": "248 113 133",
                        "--color-gray": "209 213 219",
                        "--color-foreground-primary": "255 255 255",
                    },
                },
            }),
    ],
};
