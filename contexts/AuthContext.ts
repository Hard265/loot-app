import type { UserData } from "@/services/userApi";
import { createContext } from "react";

export const AuthContext = createContext({
    signIn(credintials: UserData) {},
    signOut() {},
});
