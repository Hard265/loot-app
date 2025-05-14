import PlusFabContext from "@/contexts/PlusFabContext";
import { useContext } from "react";

export default function usePlusFab() {
    const context = useContext(PlusFabContext);
    if (!context) {
        throw new Error("usePlusFab should the use inside PlusFab provider");
    }
    return context;
}
