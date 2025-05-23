import {
    GetRootContentsDocument,
    PutFileDocument,
    PutFolderDocument,
} from "@/__generated__/schema/graphql";
import FolderListItem from "@/components/ui/FolderListItem";
import ListDisplayHeader from "@/components/ui/ListDisplayHeader";
import { RootStackT } from "@/Router";
import rootStore from "@/stores";
import { ongoingOpsStore } from "@/stores/OngoingOperationsStore";
import { getGravatarUri } from "@/utils";
import { useMutation, useQuery } from "@apollo/client";
import {
    useFocusEffect,
    useNavigation,
    useTheme,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { cssInterop } from "nativewind";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, {
    FadeIn,
    FadeOut,
    LinearTransition,
} from "react-native-reanimated";
import Skeleton from "react-native-reanimated-skeleton";
import colors from "tailwindcss/colors";

type NavigationProp = NativeStackNavigationProp<RootStackT, "Home">;

cssInterop(Skeleton, {
    className: "containerStyle",
});

function Home() {
    const theme = useTheme();
    const navigation = useNavigation<NavigationProp>();
    const [userImage, setUserImage] = useState("");
    const [userImageLoading, setUserImageLoading] = useState(false);

    const { data, loading, refetch } = useQuery(GetRootContentsDocument);
    const [refetching, setRefetching] = useState(false);

    const [updateFile] = useMutation(PutFileDocument);
    const [updateFolder] = useMutation(PutFolderDocument);

    const [ongoingOperations, setOngoingOperations] = useState<Set<string>>(
        new Set(),
    );

    useFocusEffect(
        useCallback(() => {
            (async () => {
                setUserImageLoading(true);
                const imgUrl = await getGravatarUri(
                    rootStore.authStore.user?.email!,
                    200,
                );
                setUserImage(imgUrl);
                setUserImageLoading(false);
            })();
        }, []),
    );

    useEffect(() => {
        navigation.setOptions({
            title: "",
            headerLeft() {
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
                                theme.dark ?
                                    colors.neutral[700]
                                :   colors.neutral[300]
                            }
                            boneColor={
                                theme.dark ?
                                    colors.neutral[900]
                                :   colors.neutral[200]
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
            },
        });
    }, [navigation, theme.dark, userImage, userImageLoading]);

    useEffect(() => {
        const subscriber = ongoingOpsStore
            .getOngoingOperations()
            .subscribe((operations) => {
                setOngoingOperations(operations.get("update") || new Set());
            });
        return subscriber.unsubscribe;
    }, []);

    const handleRefetch = () => {
        setRefetching(true);
        refetch().finally(() => setRefetching(false));
    };

    const handleSubmitRename = (
        id: unknown,
        name: string,
        type?: "FileType" | "FolderType",
    ) => {
        ongoingOpsStore.trackOperation("update", id as string);
        switch (type) {
            case "FileType":
                updateFile({ variables: { id, name } });
                break;
            case "FolderType":
                updateFolder({ variables: { id, name } });
                break;
        }
    };

    const dataParsed = data?.contents || [];

    return (
        <Animated.FlatList
            data={dataParsed}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) =>
                item && (
                    <FolderListItem
                        item={item}
                        onSubmitEditing={(name) =>
                            handleSubmitRename(item.id, name, item.__typename)
                        }
                        hasActiveOperation={ongoingOperations.has(item.id)}
                    />
                )
            }
            stickyHeaderIndices={[0]}
            onRefresh={handleRefetch}
            refreshing={refetching}
            ListFooterComponent={
                loading ?
                    <Animated.View
                        entering={FadeIn}
                        exiting={FadeOut}
                        layout={LinearTransition}
                        className="items-center justify-center p-4"
                    >
                        <ActivityIndicator
                            size="large"
                            color={theme.colors.primary}
                        />
                    </Animated.View>
                :   null
            }
            ListHeaderComponent={loading ? undefined : <ListDisplayHeader />}
        />
    );
}
export default Home;
