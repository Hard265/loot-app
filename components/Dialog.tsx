import { createContext, useContext } from "react";

interface DialogProps {
    open?: boolean;
    onClose?(): void;
    role: "dialog" | "alertdialog";
}

const DialogContext = createContext(null);

export function useDialog() {
    const ctx = useContext(DialogContext);
    if (!ctx) {
        throw new Error("useDialog should be used within the Dialog");
    }
    return ctx;
}

export default function Dialog(props: DialogProps) {
    return <DialogContext.Provider value={null}></DialogContext.Provider>;
}
