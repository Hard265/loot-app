import React, {
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
} from "react";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { View } from "react-native";

interface SheetProps {
    visible?: boolean;
    onDismiss?(): void;
}

export default function Sheet(props: PropsWithChildren<SheetProps>) {
    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        if (props.visible) bottomSheetRef.current?.expand();
        else bottomSheetRef.current?.close();
    }, [props.visible]);

    const renderbackdrop = useCallback((props: BottomSheetBackdropProps) => {
        return (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
            />
        );
    }, []);

    const handleOnClose = () => {
        props.onDismiss?.();
    };

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            backdropComponent={renderbackdrop}
            enablePanDownToClose
            onClose={handleOnClose}
        >
            <BottomSheetView>
                <View>{props.children}</View>
            </BottomSheetView>
        </BottomSheet>
    );
}
