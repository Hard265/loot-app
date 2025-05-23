import PlusFab from "@/components/ui/PlusFab";
import PlusFabSheet from "@/components/ui/PlusFabSheet";
import PlusFabContext from "@/contexts/PlusFabContext";
import useBackHandler from "@/hooks/useBackHandler";
import { useIsSignedIn } from "@/hooks/useIsSigned";
import { RootStackT } from "@/Router";
import BottomSheet from "@gorhom/bottom-sheet";
import { StackNavigationState } from "@react-navigation/native";
import { PropsWithChildren, useMemo, useRef, useState } from "react";

export default function PlusFabLayout(
    props: PropsWithChildren<{ state: StackNavigationState<RootStackT> }>,
) {
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
    const supportsPlusFab = useMemo(
        () =>
            ["Home", "Folder"].includes(
                props.state.routes[props.state.index].name,
            ),
        [props.state.index, props.state.routes],
    );

    return (
        <PlusFabContext.Provider value={{ ...plusFabContext, shown }}>
            {props.children}
            {isSignedIn && supportsPlusFab && (
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
