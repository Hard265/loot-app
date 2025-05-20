import { GetFolderContentsQuery } from "@/__generated__/schema/graphql";
import { createContext } from "react";

type ContentItem = NonNullable<GetFolderContentsQuery["contents"]>[number];

const ItemContext = createContext<{
    showItemContext(item: ContentItem): void;
    data: ContentItem | null;
}>(null);
export default ItemContext;
