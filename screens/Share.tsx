import {
    GetFileDocument,
    GetFolderDocument,
} from "@/__generated__/schema/graphql";
import ListItem from "@/components/ListItem";
import Text from "@/components/Text";
import { Option, showOptions } from "@/layouts/OptionsManagerLayout";
import { shareScreenSubject$ } from "@/layouts/ShareScreenLayout";
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
import { TextInput, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import {
    AdjustmentsHorizontalIcon,
    EyeIcon,
    PencilIcon,
    ShieldCheckIcon,
    UserPlusIcon,
    XMarkIcon,
} from "react-native-heroicons/outline";
import Skeleton from "react-native-reanimated-skeleton";
import colors from "tailwindcss/colors";

type routeProp = RouteProp<RootStackT, "Share">;
type navigationProp = NativeStackNavigationProp<RootStackT, "Share">;
type permissions = "view" | "edit" | "manage";

cssInterop(RectButton, {
    className: "style",
});
cssInterop(Skeleton, {
    className: "containerStyle",
});

export default function Share() {
    const theme = useTheme();
    const route = useRoute<routeProp>();
    const navigation = useNavigation<navigationProp>();
    const [shareWith, setShareWith] = useState<string[]>([]);
    const [permission, setPermission] = useState<permissions>("view");

    const [queryFileById, { loading: loadingFile, data: dataFile }] =
        useLazyQuery(GetFileDocument, {
            variables: {
                id: route.params.id,
            },
        });
    const [queryFolderById, { loading: loadingFolder, data: dataFolder }] =
        useLazyQuery(GetFolderDocument, {
            variables: {
                id: route.params.id,
            },
        });

    useFocusEffect(
        useCallback(() => {
            switch (route.params.type) {
                case "FileType":
                    queryFileById();
                    break;
                case "FolderType":
                    queryFolderById();
                    break;
            }
        }, [queryFileById, queryFolderById, route.params.type]),
    );

    useEffect(() => {
        navigation.setOptions({
            headerRight() {
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

    useEffect(() => {
        const subscriber = shareScreenSubject$.subscribe(() => {
            console.log("fired");
        });
        return subscriber.unsubscribe;
    }, []);

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

    const sharesData = useMemo(() => {
        if (route.params.type === "FileType") {
            return {
                loading: loadingFile,
                shares: dataFile?.fileById?.shares ?? [],
            };
        } else if (route.params.type === "FolderType") {
            return {
                loading: loadingFolder,
                shares: dataFolder?.folderById?.shares ?? [],
            };
        }
        return { loading: false, shares: [] };
    }, [route.params.type, loadingFile, loadingFolder, dataFile, dataFolder]);

    return (
        <View>
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
                        onSubmitEditing={(e) => {
                            setShareWith((shares) =>
                                Array.from(
                                    new Set(shares).add(e.nativeEvent.text),
                                ),
                            );
                        }}
                        submitBehavior="submit"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                    />
                </View>
            </View>
            <Skeleton
                isLoading={sharesData.loading}
                animationType="shiver"
                //@ts-ignore
                className="m-4 h-auto"
                highlightColor={
                    theme.dark ? colors.neutral[700] : colors.neutral[300]
                }
                boneColor={
                    theme.dark ? colors.neutral[900] : colors.neutral[200]
                }
                layout={[
                    {
                        width: "100%",
                        key: Math.random().toString(16),
                        flexDirection: "row",
                        gap: 8,
                        height: 28,
                        alignItems: "center",
                        children: [
                            {
                                key: Math.random().toString(16),
                                height: "100%",
                                width: "40%",
                            },
                            {
                                key: Math.random().toString(16),
                                height: "100%",

                                width: "40%",
                            },
                        ],
                    },
                ]}
            >
                <View className="flex flex-row flex-wrap items-start">
                    {sharesData.shares.map((item) => {
                        return (
                            <RectButton
                                key={item.id}
                                //@ts-ignore
                                className="bg-primary/25 p-1 px-2"
                            >
                                <Text variant="footnote">
                                    {item.sharedWith.email}
                                </Text>
                            </RectButton>
                        );
                    })}
                    {shareWith.map((email, index) => {
                        return (
                            <RectButton
                                key={`${index}-share-item`}
                                //@ts-ignore
                                className="flex flex-row items-center gap-2 bg-primary/25 px-2.5 py-1.5"
                            >
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
                        );
                    })}
                </View>
            </Skeleton>
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
                </View>
            </View>
        </View>
    );
}
