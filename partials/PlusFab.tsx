import usePlusFab from "@/hooks/usePlusFab";
import { useTheme } from "@react-navigation/native";
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
            className="absolute bottom-8 right-5"
        >
            <RectButton onPress={() => show()}>
                <View className="rounded bg-primary p-5 shadow">
                    <PlusIcon
                        color={"#ffffff"}
                        size={28}
                    />
                </View>
            </RectButton>
        </Animated.View>
    );
}
