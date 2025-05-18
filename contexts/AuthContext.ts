import { createContext } from "react";

export type authData = {
    payload: {
        email: string;
        exp: number;
        origIat: number;
    };
    token: string;
};

export const AuthContext = createContext({
    async setUser(authData: authData) {},
    async deleteUser() {},
});
