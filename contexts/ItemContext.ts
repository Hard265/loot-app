import { File, Folder } from "@/global";
import { createContext } from "react";

const ItemContext = createContext<{
    showItemContext<T extends File | Folder>(item: T): void;
    data: File | Folder | null;
}>(null);
export default ItemContext;
