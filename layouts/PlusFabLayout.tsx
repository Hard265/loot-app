import PlusFabContext from "@/contexts/PlusFabContext";
import useBackHandler from "@/hooks/useBackHandler";
import PlusFab from "@/partials/PlusFab";
import PlusFabSheet from "@/partials/PlusFabSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { PropsWithChildren, useMemo, useRef, useState } from "react";

export default function PlusFabLayout(props: PropsWithChildren) {
    const [shown, setShown] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);

    useBackHandler(() => {
        plusFabContext.dismiss();
        return true;
    });

    const plusFabContext = useMemo(
        () => ({
            show() {
                bottomSheetRef.current?.expand();
                setShown(true);
            },
            dismiss() {
                bottomSheetRef.current?.close();
                setShown(false);
            },
        }),
        [],
    );

    return (
        <PlusFabContext.Provider value={{ ...plusFabContext, shown }}>
            {props.children}
            <PlusFab />
            <PlusFabSheet
                ref={bottomSheetRef}
                onShown={() => setShown(true)}
                onDismiss={() => setShown(false)}
            />
        </PlusFabContext.Provider>
    );
}
