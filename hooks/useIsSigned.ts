import { SignInContext } from "@/contexts/SignInContext";
import { useContext } from "react";

export function useIsSignedIn() {
    const isSignedIn = useContext(SignInContext);

    if (isSignedIn === undefined) {
        throw new Error(
            "useIsSigned(In/Out) must be used within a SignInContext Provider",
        );
    }

    return isSignedIn;
}

export function useIsSignedOut() {
    return !useIsSignedIn();
}
