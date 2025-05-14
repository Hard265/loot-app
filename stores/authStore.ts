import * as SecureStore from "expo-secure-store";
import { action, makeObservable, observable, runInAction } from "mobx";

interface UserData {
    id: string;
    email: string;
}

export class AuthStore {
    user: UserData | null = null;
    loading: boolean = false;

    constructor() {
        makeObservable(this, {
            user: observable,
            loading: observable,
            setup: action,
            setUser: action,
        });
        this.setup();
    }

    async setup() {
        const user = await this.retrieveUserData();
        runInAction(() => {
            this.user = user;
        });
    }

    async setUser(user: UserData): Promise<void> {
        await this.saveUserData(user);
        runInAction(() => {
            this.user = user;
        });
    }

    private async saveUserData(user: UserData) {
        const userStr = JSON.stringify(user);
        return await SecureStore.setItemAsync("user", userStr);
    }

    private async retrieveUserData(): Promise<UserData | null> {
        const userStr = await SecureStore.getItemAsync("user");
        if (userStr === null) return null;
        return JSON.parse(userStr);
    }
}
