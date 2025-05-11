import { action, makeObservable, observable } from "mobx";

export class UiStore {
    constructor() {
        makeObservable(this, {
            appIsReady: observable,
            setAppIsReady: action,
        });
    }

    appIsReady = false;

    setAppIsReady = (ready: boolean) => {
        this.appIsReady = ready;
    };
}
