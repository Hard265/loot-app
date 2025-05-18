import usePlusFab from "@/hooks/usePlusFab";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { PlusIcon } from "react-native-heroicons/solid";
import Animated, {
    FadeInDown,
    FadeOutDown,
    LinearTransition,
} from "react-native-reanimated";

export default function PlusFab() {
    const { show } = usePlusFab();

    return (
        <Animated.View
            entering={FadeInDown}
            exiting={FadeOutDown}
            layout={LinearTransition}
            className="absolute bottom-8 left-4"
        >
            <RectButton onPress={() => show()}>
                <View className="p-4 shadow-sm bg-primary shadow-text">
                    <PlusIcon
                        color={"#ffffff"}
                        size={26}
                    />
                </View>
            </RectButton>
        </Animated.View>
    );
}
