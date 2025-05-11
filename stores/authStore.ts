import { makeAutoObservable } from "mobx";
import { deleteToken, setToken, Token } from "../services/api";

export class AuthStore {
    constructor() {
        makeAutoObservable(this);
    }

    async signIn(token: Token) {
        await setToken(token);
    }

    async signOut() {
        await deleteToken();
    }
}
