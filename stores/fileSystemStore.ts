import { makeAutoObservable } from "mobx";

export class FileSystemStore {
    files: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addFile(file: string) {
        this.files.push(file);
    }

    removeFile(file: string) {
        this.files = this.files.filter((f) => f !== file);
    }
}
