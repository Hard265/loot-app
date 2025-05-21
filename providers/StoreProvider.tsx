import React, { PropsWithChildren } from "react";
import StoreContext from "../contexts/StoreContext";
import { useLocalStore } from "mobx-react-lite";

export default function StoreProvider({ children }: PropsWithChildren) {
    const store = useLocalStore(() => {
        return {
            nameEditing: null,
        };
    });

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
}
