import { PropsWithChildren } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { cssInterop } from "nativewind";

cssInterop(RectButton, { className: "style" });

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
            className="flex flex-row justify-center items-center p-3 gap-4 bg-primary"
        >
            <ActivityIndicator animating={!!props.loading} />
            <Text className="text-text text-base">{props.children}</Text>
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

export function ButtonText(props: PropsWithChildren<ButtonProps>) {
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
