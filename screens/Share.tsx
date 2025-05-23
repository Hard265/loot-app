import { GetFileDocument } from "@/__generated__/schema/graphql";
import ListItem from "@/components/ListItem";
import Text from "@/components/Text";
import { Option, showOptions } from "@/layouts/OptionsManagerLayout";
import { RootStackT } from "@/Router";
import { useLazyQuery } from "@apollo/client";
import {
    RouteProp,
    useFocusEffect,
    useNavigation,
    useRoute,
    useTheme,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { cssInterop } from "nativewind";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, TextInput, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import {
    EyeIcon,
    PencilIcon,
    ShieldCheckIcon,
    UserPlusIcon,
    XMarkIcon,
    AdjustmentsHorizontalIcon,
    CalendarDaysIcon,
    BellAlertIcon,
    CheckIcon,
} from "react-native-heroicons/outline";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import colors from "tailwindcss/colors";

type routeProp = RouteProp<RootStackT, "Share">;
type navigationProp = NativeStackNavigationProp<RootStackT, "Share">;
type permissions = "view" | "edit" | "manage";

cssInterop(RectButton, {
    className: "style",
});

export default function Share() {
    const theme = useTheme();
    const route = useRoute<routeProp>();
    const navigation = useNavigation<navigationProp>();
    const [shareWith, setShareWith] = useState<string[]>([]);

    const [permission, setPermission] = useState<permissions>("view");

    const [queryFile, { loading, data }] = useLazyQuery(GetFileDocument, {
        variables: {
            id: route.params.id,
        },
    });

    useFocusEffect(
        useCallback(() => {
            switch (route.params.type) {
                case "FileType":
                    queryFile();
                    break;
            }
        }, [queryFile, route.params.type]),
    );

    useEffect(() => {
        navigation.setOptions({
            headerRight(props) {
                return (
                    <RectButton>
                        <Text
                            variant="body"
                            color="primary"
                        >
                            Create Link
                        </Text>
                    </RectButton>
                );
            },
        });
    });

    const permissionOptions: Option<permissions>[] = useMemo(
        () => [
            {
                label: "Viewer",
                value: "view",
                icon: (
                    <EyeIcon
                        size={20}
                        color={theme.colors.text}
                    />
                ),
            },
            {
                label: "Editor",
                value: "edit",
                icon: (
                    <PencilIcon
                        size={20}
                        color={theme.colors.text}
                    />
                ),
            },
            {
                label: "Manager",
                value: "manage",
                icon: (
                    <AdjustmentsHorizontalIcon
                        size={20}
                        color={theme.colors.text}
                    />
                ),
            },
        ],
        [theme.colors.text],
    );

    return (
        <>
            <ScrollView>
                <View className="flex flex-row items-center border-b border-text/25">
                    <View className="p-4">
                        <UserPlusIcon
                            size={24}
                            color={theme.colors.text}
                        />
                    </View>
                    <View className="flex flex-1">
                        <TextInput
                            className="ml-1.5 p-4 font-[MontrealRegular] text-lg text-text placeholder-red-700 caret-primary"
                            placeholder="Share with (email address)"
                            placeholderTextColor={colors.neutral[500]}
                            autoFocus
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                    </View>
                </View>
                {loading ?
                    <Animated.View
                        entering={FadeIn}
                        exiting={FadeOut}
                        className="items-center justify-center flex-1 p-8"
                    >
                        <ActivityIndicator
                            size="large"
                            color={theme.colors.primary}
                        />
                    </Animated.View>
                :   <View>
                        <View className="flex flex-row flex-wrap items-start p-4">
                            {data?.fileById?.shares.map((item) => {
                                return (
                                    <RectButton
                                        key={item.id}
                                        className="p-1 px-2 bg-primary/25"
                                    >
                                        <Text variant="footnote">
                                            {item.sharedWith.email}
                                        </Text>
                                    </RectButton>
                                );
                            })}
                            {shareWith.map((email, index) => {
                                return (
                                    <Animated.View key={`${index}-share-item`}>
                                        <RectButton className="flex flex-row items-center gap-2 bg-primary/25 px-2.5 py-1.5">
                                            <Text
                                                variant="label"
                                                color="primary"
                                            >
                                                {email}
                                            </Text>
                                            <XMarkIcon
                                                size={16}
                                                color={theme.colors.primary}
                                            />
                                        </RectButton>
                                    </Animated.View>
                                );
                            })}
                        </View>
                    </View>
                }
                <View>
                    <View>
                        <ListItem
                            icon={
                                <ShieldCheckIcon
                                    size={24}
                                    color={theme.colors.text}
                                />
                            }
                            onTap={() => {
                                showOptions(permissionOptions).then((value) => {
                                    if (value) setPermission(value);
                                });
                            }}
                            title="Permission"
                            subtitle={`Can ${permission}`}
                        />
                        <ListItem
                            icon={
                                <CalendarDaysIcon
                                    size={24}
                                    color={theme.colors.text}
                                />
                            }
                            title="Time-Limited access"
                            subtitle="Not set"
                        />
                        <ListItem
                            icon={
                                <BellAlertIcon
                                    size={24}
                                    color={theme.colors.text}
                                />
                            }
                            title="Notify on access"
                        />
                    </View>
                </View>
            </ScrollView>
            <RectButton className="absolute bottom-8 right-4 items-center justify-center p-5 bg-primary shadow-sm shadow-text">
                <CheckIcon
                    size={24}
                    color={colors.white}
                />
            </RectButton>
        </>
    );
}
