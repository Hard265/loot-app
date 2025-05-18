import { cssInterop } from "nativewind";
import { ReactNode } from "react";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Text from "./Text";
import Animated, {
    FadeIn,
    FadeOut,
    LinearTransition,
} from "react-native-reanimated";

cssInterop(RectButton, { className: "style" });

export default function ListItem(props: {
    title: string;
    subtitle?: string;
    trailing?: string;
    icon?: ReactNode;
    onTap?(): void;
    onLongTap?(): void;
}) {
    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            layout={LinearTransition}
        >
            <RectButton
                onPress={props.onTap}
                onLongPress={props.onLongTap}
                className="flex flex-row items-center gap-2 p-2 py-3"
            >
                {props.icon}
                <View className="flex-1">
                    <Text variant="label">{props.title}</Text>
                    {props.subtitle && (
                        <Text variant="caption1">{props.subtitle}</Text>
                    )}
                </View>
            </RectButton>
        </Animated.View>
    );
}
