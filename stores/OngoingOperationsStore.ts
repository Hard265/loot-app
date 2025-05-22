import { BehaviorSubject, Subject, scan } from "rxjs";

class OngoingOperationsStore {
    private events$ = new Subject<{
        id: string;
        type: "update" | "create" | "delete";
        action: "add" | "remove";
    }>();

    private ongoingOperations$ = new BehaviorSubject<Map<string, Set<string>>>(
        new Map([
            ["update", new Set<string>()],
            ["create", new Set<string>()],
            ["delete", new Set<string>()],
        ]),
    );

    constructor() {
        this.events$
            .pipe(
                scan(
                    (acc, { id, type, action }) =>
                        this.updateSet(acc, id, type, action),
                    new Map<string, Set<string>>([
                        ["update", new Set<string>()],
                        ["create", new Set<string>()],
                        ["delete", new Set<string>()],
                    ]),
                ),
            )
            .subscribe(this.ongoingOperations$);
    }

    private updateSet(
        set: Map<string, Set<string>>,
        id: string,
        type: string,
        action: "add" | "remove",
    ): Map<string, Set<string>> {
        const updated = new Map(set);
        const operationSet = updated.get(type) ?? new Set<string>();

        // eslint-disable-next-line no-unused-expressions
        action === "add" ? operationSet.add(id) : operationSet.delete(id);
        updated.set(type, operationSet);

        return updated;
    }

    trackOperation(type: "update" | "create" | "delete", id: string) {
        this.events$.next({ id, type, action: "add" });
    }

    completeOperation(type: "update" | "create" | "delete", id: string) {
        this.events$.next({ id, type, action: "remove" });
    }

    getOngoingOperations() {
        return this.ongoingOperations$.asObservable();
    }

    hasOngoingOperation() {
        this.ongoingOperations$.
    }
}

export const ongoingOpsStore = new OngoingOperationsStore();
