import type { UserData } from "@/services/userApi";
import { createContext } from "react";

export const AuthContext = createContext({
    async signIn(credintials: UserData) {},
    async signUp(credintials: UserData) {},
    async signOut() {},
});
