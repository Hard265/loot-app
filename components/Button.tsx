import { PropsWithChildren } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

interface ButtonProps {
    loading?: boolean;
    disabled?: boolean;
    onPress?(): void;
}
export function Button(props: PropsWithChildren<ButtonProps>) {
    const enabled = !props.disabled || !props.loading;

    return (
        <RectButton
            enabled={enabled}
            onPress={props.onPress}
        >
            <View className="flex flex-row justify-center items-center bg-primary">
                <ActivityIndicator animating={!!props.loading} />
                <Text>{props.children}</Text>
            </View>
        </RectButton>
    );
}
export function ButtonOutlined(props: PropsWithChildren<ButtonProps>) {
    const enabled = !props.disabled || !props.loading;

    return (
        <RectButton
            enabled={enabled}
            onPress={props.onPress}
        >
            <View>
                <ActivityIndicator animating={!!props.loading} />
                <Text>{props.children}</Text>
            </View>
        </RectButton>
    );
}
