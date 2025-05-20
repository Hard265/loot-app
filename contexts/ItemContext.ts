import { GetFolderContentsQuery } from "@/__generated__/schema/graphql";
import { createContext } from "react";

type ContentItem = GetFolderContentsQuery["contents"] extends (infer T)[]
    ? NonNullable<T>
    : never;

const ItemContext = createContext<{
    showItemContext(item: ContentItem): void;
    data: ContentItem | null;
}>({
    showItemContext: () => {
        throw new Error("Function not implemented.");
    },
    data: null,
});
export default ItemContext;
