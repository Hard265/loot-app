import { createContext } from "react";

const ItemContext = createContext<{
    showItemContext<T extends object>(item: T): void;
}>({
    showItemContext: () => {
        throw new Error("Function not implemented.");
    },
});
export default ItemContext;
