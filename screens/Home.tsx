import Text from "@/components/Text";
import useAuth from "@/hooks/useAuth";
import { RootStackT } from "@/Router";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolation,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type navigationProp = NativeStackNavigationProp<RootStackT, "Home">;

export default function Home() {
    const navigation = useNavigation<navigationProp>();
    const insets = useSafeAreaInsets();
    const { signOut } = useAuth();
    const [headerHeight, setHeaderHeight] = useState(0);
    const scrollY = useSharedValue(0);

    const headerAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: scrollY.value }],
    }));

    useEffect(() => {
        // navigation.setOptions({
        //     headerTransparent: true,
        //     header() {
        //         return (
        //             <Animated.View
        //                 style={[
        //                     { paddingTop: insets.top },
        //                     headerAnimatedStyle,
        //                 ]}
        //                 className=""
        //                 onLayout={(e) =>
        //                     setHeaderHeight(e.nativeEvent.layout.height)
        //                 }
        //             >
        //                 <View className="p-4">
        //                     <Text
        //                         variant="heading"
        //                         color="secondary"
        //                     >
        //                         Heading
        //                     </Text>
        //                 </View>
        //             </Animated.View>
        //         );
        //     },
        // });
    }, [insets.top, navigation, headerAnimatedStyle]);

    const reanimatedScrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = interpolate(
                event.contentOffset.y,
                [0, headerHeight],
                [0, -headerHeight],
                Extrapolation.CLAMP,
            );
        },
    });

    return (
        <Animated.ScrollView
            onScroll={reanimatedScrollHandler}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingTop: headerHeight }}
            contentContainerClassName="pb-[2000]"
        >
            <Pressable onPress={() => signOut()}>
                <Text>logout</Text>
            </Pressable>
        </Animated.ScrollView>
    );
}
