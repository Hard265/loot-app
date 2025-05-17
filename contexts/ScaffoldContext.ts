import { createContext, ReactNode } from "react";

const ScaffoldContext = createContext<{
    openSheet<T extends ReactNode, P>(data: T): Promise<P>;
    selectSheetItem<T>(value: T): void;
}>({
    openSheet: function () {
        throw new Error("Function not implemented.");
    },
    selectSheetItem: function () {
        throw new Error("Function not implemented.");
    },
});

export default ScaffoldContext;
