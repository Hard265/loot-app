import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth should be used inside AuthProvider");
    }
    return context;
}
