import { PropsWithChildren } from "react";
import { ActivityIndicator, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { cssInterop } from "nativewind";
import clsx from "clsx";
import Text from "./Text";

cssInterop(RectButton, { className: "style" });

interface ButtonProps {
    loading?: boolean;
    disabled?: boolean;
    onPress?(): void;
}
export function Button(props: PropsWithChildren<ButtonProps>) {
    const enabled = !props.disabled && !props.loading;

    return (
        <RectButton
            enabled={enabled}
            onPress={props.onPress}
        >
            <View
                className={clsx(
                    "flex flex-row items-center justify-center gap-4 bg-primary p-2.5 px-4 shadow-sm shadow-text",
                    { "opacity-50": !enabled },
                )}
            >
                {!!props.loading && (
                    <ActivityIndicator
                        color="#ffffff"
                        size="small"
                    />
                )}
                <Text
                    variant="label"
                    color="tertiary"
                >
                    {props.children}
                </Text>
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
            <View className="flex flex-row items-center justify-center gap-4 border border-gray-300 bg-background p-2.5 px-4 shadow dark:border-text/75">
                <Text
                    variant="label"
                    color="secondary"
                >
                    {props.children}
                </Text>
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
