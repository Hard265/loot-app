import React, { PropsWithChildren, ReactNode, useState } from "react";
import ScaffoldContext from "../contexts/ScaffoldContext";
import Sheet from "../components/ui/Sheet";

export default function ScaffoldProviderLayout({
    children,
}: PropsWithChildren) {
    const [sheetNode, setSheetNode] = useState<ReactNode>(null);
    const [isSheetVisible, setSheetIsVisible] = useState(false);
    const [sheetResolver, setSheetResolver] = useState<
        ((value: any) => void) | null
    >(null);

    const openSheet: <T extends ReactNode, P>(data: T) => Promise<P> = (
        data,
    ) => {
        setSheetNode(data);
        setSheetIsVisible(true);
        return new Promise((resolve) => {
            setSheetResolver(() => resolve);
        });
    };

    const selectSheetItem: <T>(value: T) => void = (value) => {
        sheetResolver?.(value);
        setSheetIsVisible(false);
    };

    const handleOnDismiss = () => {
        setSheetIsVisible(false);
        setSheetResolver(null);
    };

    return (
        <ScaffoldContext value={{ openSheet, selectSheetItem }}>
            {children}
            <Sheet
                visible={isSheetVisible}
                onDismiss={handleOnDismiss}
            />
        </ScaffoldContext>
    );
}
