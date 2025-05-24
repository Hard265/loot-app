import ListItem from "@/components/ListItem";
import useAuth from "@/hooks/useAuth";
import { showOptions } from "@/layouts/OptionsManagerLayout";
import { RootStackT } from "@/Router";
import store from "@/stores";
import { getGravatarUri } from "@/utils";
import {
    useFocusEffect,
    useNavigation,
    useTheme,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { cssInterop, useColorScheme } from "nativewind";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import {
    ArrowRightOnRectangleIcon,
    DevicePhoneMobileIcon,
    MoonIcon,
    PaintBrushIcon,
    QuestionMarkCircleIcon,
    ServerIcon,
    SunIcon,
    UserCircleIcon,
} from "react-native-heroicons/outline";
import Animated from "react-native-reanimated";
import Skeleton from "react-native-reanimated-skeleton";
import colors from "tailwindcss/colors";
import Text from "../components/Text";

type ColorSchemeName = "light" | "dark" | "system";

cssInterop(Skeleton, {
    className: "containerStyle",
});

export default function User() {
    const theme = useTheme();
    const { deleteUser } = useAuth();
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackT, "User">>();
    const [userImage, setUserImage] = useState("");
    const [userImageLoading, setUserImageLoading] = useState(false);
    const { setColorScheme, colorScheme } = useColorScheme();

    useEffect(() => {
        navigation.setOptions({
            title: "",
            headerRight({ tintColor }) {
                return (
                    <RectButton>
                        <QuestionMarkCircleIcon
                            size={24}
                            color={tintColor}
                        />
                    </RectButton>
                );
            },
        });
    }, [navigation]);

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
        <ScrollView>
            <View className="flex flex-row items-end gap-4 p-4">
                <Skeleton
                    // @ts-ignore
                    className="size-24"
                    isLoading={userImageLoading}
                    animationDirection="diagonalTopRight"
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
                <View className="flex flex-col items-start">
                    <View className="bg-primary/25 px-1.5 py-1">
                        <Text variant="body">Basic</Text>
                    </View>
                    <Text variant="title3">{store.authStore.user?.email}</Text>
                </View>
            </View>
            <View>
                <View className="px-4 py-2">
                    <Text color="primary">Account settings</Text>
                </View>
                {store.authStore.user?.email && (
                    <ListItem
                        title={store.authStore.user?.email}
                        onTap={() => {
                            navigation.navigate("UserSettings");
                        }}
                        icon={
                            <UserCircleIcon
                                size={24}
                                color={theme.colors.text}
                            />
                        }
                    />
                )}
                <View className="px-4 py-2">
                    <Text color="primary">Appearance</Text>
                </View>
                <ListItem
                    title="Theme"
                    icon={
                        <PaintBrushIcon
                            size={24}
                            color={theme.colors.text}
                        />
                    }
                    subtitle={colorScheme}
                    onTap={() =>
                        showOptions<ColorSchemeName>(
                            [
                                {
                                    label: "Light",
                                    value: "light",
                                    icon: (
                                        <SunIcon
                                            size={20}
                                            color={theme.colors.text}
                                        />
                                    ),
                                },
                                {
                                    label: "Dark",
                                    value: "dark",
                                    icon: (
                                        <MoonIcon
                                            size={20}
                                            color={theme.colors.text}
                                        />
                                    ),
                                },
                                {
                                    label: "System",
                                    value: "system",
                                    icon: (
                                        <DevicePhoneMobileIcon
                                            size={20}
                                            color={theme.colors.text}
                                        />
                                    ),
                                },
                            ],
                            { selected: colorScheme },
                        ).then((scheme) => {
                            if (scheme) setColorScheme(scheme);
                        })
                    }
                />
                <View className="px-4 py-2">
                    <Text color="primary">System</Text>
                </View>
                <ListItem
                    title="Clear local cache"
                    icon={
                        <ServerIcon
                            size={24}
                            color={theme.colors.text}
                        />
                    }
                />
                <ListItem
                    title="Logout"
                    onTap={() => deleteUser()}
                    icon={
                        <ArrowRightOnRectangleIcon
                            size={24}
                            color={theme.colors.text}
                        />
                    }
                />
            </View>
        </ScrollView>
    );
}
