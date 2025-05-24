import { cssInterop } from "nativewind";
import { ReactNode, useState } from "react";
import { View, TextInput, ActivityIndicator } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Text from "./Text";
import Animated, {
    FadeIn,
    FadeOut,
    LinearTransition,
} from "react-native-reanimated";
import clsx from "clsx";
import { useTheme } from "@react-navigation/native";
import { CheckIcon } from "react-native-heroicons/outline";

cssInterop(RectButton, { className: "style" });

export default function ListItem(props: {
    editing?: boolean;
    onSubmit?(title: string): void;
    title: string;
    subtitle?: string;
    subtitleLeading?: ReactNode;
    trailing?: string;
    icon?: ReactNode;
    onTap?(): void;
    onLongTap?(): void;
    hasActivity?: boolean;
    selected?: boolean;
    color?: "error" | "primary";
    disabled?: boolean;
}) {
    const theme = useTheme();
    const [title, setTitle] = useState(props.title);
    const disabled = !(props.onTap || props.onLongTap) || props.disabled;

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            layout={LinearTransition}
            className={clsx(props.disabled && "opacity-50")}
        >
            <RectButton
                onPress={props.onTap}
                onLongPress={props.onLongTap}
                enabled={!disabled}
                //@ts-ignore
                className="flex flex-row items-center gap-4 p-4 py-3"
            >
                <View className="h-6 w-6 items-center justify-center">
                    {props.hasActivity ?
                        <ActivityIndicator
                            color={theme.colors.primary}
                            size="small"
                        />
                    :   props.icon && props.icon}
                </View>
                <View className="flex flex-1 flex-col">
                    <View>
                        {!props.editing ?
                            <Text
                                variant="title3"
                                color={props.color}
                            >
                                {props.title}
                            </Text>
                        :   <TextInput
                                value={title}
                                onChangeText={setTitle}
                                onSubmitEditing={() => props.onSubmit?.(title)}
                                multiline={false}
                                autoFocus
                                autoCapitalize="none"
                                enablesReturnKeyAutomatically
                                selectTextOnFocus
                                onBlur={() => props.onSubmit?.("")}
                                className="p-2.5 font-[MontrealMedium] text-xl text-text focus:border-2 focus:border-primary"
                            />
                        }
                    </View>
                    {!props.editing &&
                        (props.subtitle ||
                            props.trailing ||
                            props.subtitleLeading) && (
                            <View className="flex flex-row items-center justify-between">
                                <View className="flex flex-row items-center gap-2">
                                    {props.subtitleLeading}
                                    {props.subtitle && (
                                        <Text variant="callout">
                                            {props.subtitle}
                                        </Text>
                                    )}
                                </View>
                                {props.trailing && (
                                    <Text variant="callout">
                                        {props.trailing}
                                    </Text>
                                )}
                            </View>
                        )}
                </View>
                {props.selected && (
                    <View>
                        <CheckIcon
                            size={20}
                            color={theme.colors.text}
                        />
                    </View>
                )}
            </RectButton>
        </Animated.View>
    );
}
