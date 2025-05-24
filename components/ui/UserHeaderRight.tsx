import { RootStackT } from "@/Router";
import store from "@/stores";
import { getGravatarUri } from "@/utils";
import {
    useFocusEffect,
    useNavigation,
    useTheme,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { RectButton } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Skeleton from "react-native-reanimated-skeleton";
import colors from "tailwindcss/colors";

type NavigationProp = NativeStackNavigationProp<RootStackT, "Home">;

export default function UserHeaderLeft() {
    const navigation = useNavigation<NavigationProp>();
    const theme = useTheme();

    const [userImage, setUserImage] = useState("");
    const [userImageLoading, setUserImageLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            (async () => {
                setUserImageLoading(true);
                const imgUrl = await getGravatarUri(
                    store.authStore.user?.email!,
                    200,
                );
                setUserImage(imgUrl);
                setUserImageLoading(false);
            })();
        }, []),
    );

    return (
        <RectButton
            onPress={() => {
                navigation.navigate("User");
            }}
        >
            <Skeleton
                // @ts-ignore
                className="size-12"
                isLoading={userImageLoading}
                highlightColor={
                    theme.dark ? colors.neutral[700] : colors.neutral[300]
                }
                boneColor={
                    theme.dark ? colors.neutral[900] : colors.neutral[200]
                }
                layout={[
                    {
                        height: "100%",
                        width: "100%",
                    },
                ]}
            >
                {userImage && (
                    <Animated.Image
                        className="h-full w-full"
                        source={{ uri: userImage }}
                    />
                )}
            </Skeleton>
        </RectButton>
    );
}
