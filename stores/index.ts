import { AuthStore } from "./authStore";

class Store {
    authStore: AuthStore;

    constructor() {
        this.authStore = new AuthStore();
    }
}

const store = new Store();
export default store;
