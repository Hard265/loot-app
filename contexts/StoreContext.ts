import { createContext, useContext } from "react";

export enum nameEditingType {
    FileType,
    FolderType,
}

interface StoreContextType {
    nameEditing: {
        type: nameEditingType;
        id: string;
    } | null;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return context;
};

export default StoreContext;
