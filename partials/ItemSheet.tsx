import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ForwardedRef, useCallback } from "react";

interface ItemSheetProps {
    ref: ForwardedRef<BottomSheet>;
}

export default function ItemSheet(props: ItemSheetProps) {
    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
        return (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        );
    }, []);

    return (
        <BottomSheet
            ref={props.ref}
enablePanDownToClose
index={-1}
            backdropComponent={renderBackdrop}
        >
            <BottomSheetView></BottomSheetView>
        </BottomSheet>
    );
}
