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
}) {
    const theme = useTheme();
    const [title, setTitle] = useState(props.title);
    const disabled = !(props.onTap || props.onLongTap);

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            layout={LinearTransition}
            className={clsx(!(props.onTap || props.onLongTap) && "opacity-50")}
        >
            <RectButton
                onPress={props.onTap}
                onLongPress={props.onLongTap}
                enabled={!disabled}
                className="flex flex-row items-center gap-4 p-4 py-3"
            >
                <View className="h-6 w-6 items-center justify-center">
                    {props.hasActivity && !props.icon ?
                        <ActivityIndicator
                            color={theme.colors.primary}
                            size="small"
                        />
                    :   props.icon}
                </View>
                <View className="flex flex-1 flex-col">
                    <View>
                        {!props.editing ?
                            <Text variant="title3">{props.title}</Text>
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
            </RectButton>
        </Animated.View>
    );
}
