import ItemSheet from "@/components/ui/ItemSheet";
import ItemContext from "@/contexts/ItemContext";
import { File, Folder } from "@/global";
import BottomSheet from "@gorhom/bottom-sheet";
import { PropsWithChildren, useCallback, useRef, useState } from "react";

type entity = Folder | File;

export default function ItemContextLayout({ children }: PropsWithChildren) {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [data, setData] = useState<entity | null>(null);

    const showItemContext: <T extends entity>(item: T) => void = useCallback(
        (item: entity) => {
            setData(item);
            bottomSheetRef.current?.expand();
        },
        [],
    );

    const handleSheetClose = useCallback(() => {
        setData(null);
    }, []);

    return (
        <ItemContext.Provider value={{ showItemContext, data }}>
            {children}
            <ItemSheet
                ref={bottomSheetRef}
                onClose={handleSheetClose}
            />
        </ItemContext.Provider>
    );
}
