import PlusFab from "@/components/ui/PlusFab";
import PlusFabSheet from "@/components/ui/PlusFabSheet";
import PlusFabContext from "@/contexts/PlusFabContext";
import useBackHandler from "@/hooks/useBackHandler";
import { useIsSignedIn } from "@/hooks/useIsSigned";
import BottomSheet from "@gorhom/bottom-sheet";
import { PropsWithChildren, useMemo, useRef, useState } from "react";

export default function PlusFabLayout(props: PropsWithChildren) {
    const [shown, setShown] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const isSignedIn = useIsSignedIn();

    useBackHandler(shown, () => {
        plusFabContext.dismiss();
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
            {isSignedIn && (
                <>
                    <PlusFab />
                    <PlusFabSheet
                        ref={bottomSheetRef}
                        onShown={() => setShown(true)}
                        onDismiss={() => setShown(false)}
                    />
                </>
            )}
        </PlusFabContext.Provider>
    );
}
