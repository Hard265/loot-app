import { PropsWithChildren } from "react";
import { RectButton } from "react-native-gesture-handler";
import { CheckIcon } from "react-native-heroicons/outline";
import { Subject } from "rxjs";
import colors from "tailwindcss/colors";

const ShareScreenSubject = new Subject<void>();
export const shareScreenSubject$ = ShareScreenSubject.asObservable();

export default function ShareScreenLayout({ children }: PropsWithChildren) {
    return (
        <>
            <RectButton
                onPress={() => {
                    ShareScreenSubject.next();
                }}
                //@ts-ignore
                className="z-1 absolute bottom-8 right-4 items-center justify-center bg-primary p-4 shadow-sm shadow-text"
            >
                <CheckIcon
                    size={24}
                    color={colors.white}
                />
            </RectButton>
            {children}
        </>
    );
}
