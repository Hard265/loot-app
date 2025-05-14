import { useEffect } from "react";
import { BackHandler } from "react-native";

export default function useBackHandler(callback?: () => boolean) {
    useEffect(() => {
        const backHandler = () => {
            return callback?.();
        };
        const subscriber = BackHandler.addEventListener(
            "hardwareBackPress",
            backHandler,
        );

        return () => {
            subscriber.remove();
        };
    }, [callback]);
}
