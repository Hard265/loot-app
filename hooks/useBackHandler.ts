import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { BackHandler } from "react-native";

export default function useBackHandler(callback?: () => boolean) {
    useFocusEffect(
        useCallback(() => {
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
        }, [callback]),
    );
}
