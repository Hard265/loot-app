import { AuthStore } from "./authStore";
import { FileSystemStore } from "./fileSystemStore";
import { UiStore } from "./uiStore";

class Store {
    authStore: AuthStore;
    uiStore: UiStore;
    fileSystemStore: FileSystemStore;

    constructor() {
        this.authStore = new AuthStore();
        this.uiStore = new UiStore();
        this.fileSystemStore = new FileSystemStore();
    }
}

const store = new Store();
export default store;
