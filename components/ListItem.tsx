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
                className="flex flex-row items-center p-4 py-3 gap-4"
            >
                {props.icon}
                <View className="flex-1">
                    <Text variant="title3">{props.title}</Text>
                    <View className="flex flex-row items-center justify-between">
                        {props.subtitle && (
                            <Text variant="callout">{props.subtitle}</Text>
                        )}
                        {props.trailing && (
                            <Text variant="callout">{props.trailing}</Text>
                        )}
                    </View>
                </View>
            </RectButton>
        </Animated.View>
    );
}
