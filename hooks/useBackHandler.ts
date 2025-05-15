import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { BackHandler } from "react-native";

export default function useBackHandler(
    condition: boolean,
    callback?: () => void,
) {
    useFocusEffect(
        useCallback(() => {
            const backHandler = () => {
                if (condition) {
                    callback?.();
                    return true;
                }
                return false;
            };
            const subscriber = BackHandler.addEventListener(
                "hardwareBackPress",
                backHandler,
            );

            return () => {
                subscriber.remove();
            };
        }, [callback, condition]),
    );
}
