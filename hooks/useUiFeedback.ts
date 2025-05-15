import { UiFeedbackContext } from "@/contexts/UiFeedbackContext";
import { useContext } from "react";

export default function useUiiFeedback() {
    const ctx = useContext(UiFeedbackContext);
    if (!ctx)
        throw new Error("useUiFeedback shoud be used inside UiFeedbacProvider");
    return ctx;
}
