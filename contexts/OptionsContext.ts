import { createContext, ReactNode, useContext } from "react";

export interface Option<T = unknown> {
    value: T;
    label: string;
    icon?: ReactNode;
    disabled?: boolean;
}

export interface OptionsConfig {
    title: string;
    dismissOnSelect?: boolean;
}

export interface OptionsContextType {
    showOptions<T extends Option>(
        items: T[],
        config?: OptionsConfig,
    ): Promise<T["value"]>;
}

const OptionsContext = createContext<OptionsContextType | null>(null);

export function useOptions() {
    const context = useContext(OptionsContext);
    if (!context) {
        throw new Error("useOptions must be used within an OptionsProvider");
    }
    return context;
}

export default OptionsContext;
