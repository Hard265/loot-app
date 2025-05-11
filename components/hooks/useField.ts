import { useContext } from "react";
import { FieldContext } from "../Field";

export default function useField() {
    const context = useContext(FieldContext);
    if (!context) {
        throw new Error("useField must be used within a FieldProvider");
    }
    return context;
}
