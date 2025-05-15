import { createContext, ReactNode } from "react";

export const UiFeedbackContext = createContext<{
    menu(
        renderer: (props: {
            dismiss(): void;
            select(response: unknown): void;
        }) => ReactNode,
    ): Promise<string>;
}>({
    menu: function (
        renderer: (props: { dismiss(): void; select(): void }) => ReactNode,
    ): Promise<string> {
        throw new Error("Function not implemented.");
    },
});
