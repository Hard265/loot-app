import ItemContext from "@/contexts/ItemContext";
import ItemSheet from "@/partials/ItemSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { PropsWithChildren, useRef } from "react";

export default function ItemContextLayout({ children }: PropsWithChildren) {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const showItemContext = (item: object) => {};
    return (
        <ItemContext.Provider value={{ showItemContext }}>
            {children}
<ItemSheet(props)
        </ItemContext.Provider>
    );
}
