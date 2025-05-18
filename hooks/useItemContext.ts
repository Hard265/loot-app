import ItemContext from "@/contexts/ItemContext";
import { useContext } from "react";

export function useItemContext() {
    const ctx = useContext(ItemContext);
    if (!ctx) {
        throw new Error(
            "useItemContext should be used inside ItemContextProvider",
        );
    }
    return ctx;
}
