import { UiFeedbackContext } from "@/contexts/UiFeedbackContext";
import useBackHandler from "@/hooks/useBackHandler";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { cssInterop } from "nativewind";
import {
    PropsWithChildren,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { View } from "react-native";

cssInterop(BottomSheet, {
    backgroundClassName: "backgroundStyle",
    handleIndicatorClassName: "handleIndicatorStyle",
});

export default function UiFeedbackLayout({ children }: PropsWithChildren) {
    const [sheetShown, setSheetShown] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [sheetContent, setSheetContent] = useState<ReactNode | null>(null);
    const [sheetResolver, setSheetResolver] = useState<
        ((response: any) => void) | null
    >(null);

    useEffect(() => {}, [sheetContent]);

    const handleSheetIndexChange = (index: number) => {
        setSheetShown(index >= 0);
    };

    useBackHandler(sheetShown, () => {
        handleSheetResponse(null);
    });

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                {...props}
            />
        ),
        [],
    );

    const handleSheetResponse = (value: unknown) => {
        bottomSheetRef.current?.close();
        setSheetContent(null);
        sheetResolver?.(value);
    };

    return (
        <UiFeedbackContext.Provider
            value={{
                menu: (renderer) => {
                    return new Promise((resolve) => {
                        bottomSheetRef.current?.expand();
                        const menuNode = renderer({
                            select: handleSheetResponse,
                            dismiss: () => handleSheetResponse(null),
                        });
                        setSheetContent(menuNode);
                        setSheetResolver(() => resolve);
                    });
                },
            }}
        >
            {children}
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                backdropComponent={renderBackdrop}
                enablePanDownToClose
                //@ts-ignore
                backgroundClassName="bg-secondary rounded-none"
                handleIndicatorClassName="bg-text"
                onChange={handleSheetIndexChange}
            >
                <BottomSheetView>
                    {sheetContent}
                    <View />
                </BottomSheetView>
            </BottomSheet>
        </UiFeedbackContext.Provider>
    );
}
