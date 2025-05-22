import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { ArrowDownIcon } from "react-native-heroicons/outline";
import Animated, {
    FadeIn,
    FadeOut,
    LinearTransition,
} from "react-native-reanimated";
import Text from "@/components/Text";
import Avatar from "@/components/Avatar";
import { RootStackT } from "@/Router";
import { getGravatarUri } from "@/utils";
import { useMutation, useQuery } from "@apollo/client";
import { RectButton } from "react-native-gesture-handler";
import FolderListItem from "@/partials/FolderListItem";
import {
    GetRootContentsDocument,
    PutFolderDocument,
    PutFileDocument,
} from "@/__generated__/schema/graphql";
import { useStore } from "@/contexts/StoreContext";
import rootStore from "@/stores";

type NavigationProp = NativeStackNavigationProp<RootStackT, "Home">;

const SortMenu = () => {
    const { colors } = useTheme();

    return (
        <>
            <Pressable className="flex-row items-center gap-2 bg-background p-4">
                <Text variant="title3">Name</Text>
                <ArrowDownIcon
                    size={16}
                    color={colors.text}
                />
            </Pressable>
        </>
    );
};

export default function Home() {
    const theme = useTheme();
    const navigation = useNavigation<NavigationProp>();
    const store = useStore();
    const [userImage, setUserImage] = useState("");
    const { data, loading, refetch } = useQuery(GetRootContentsDocument);
    const [updateFile] = useMutation(PutFileDocument);
    const [updateFolder] = useMutation(PutFolderDocument);

    const [refetching, setRefetching] = useState(false);

    useEffect(() => {
        (async () => {
            setUserImage(
                await getGravatarUri(rootStore.authStore.user?.email!, 80),
            );
        })();
    }, []);

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
                        <Avatar uri={userImage} />
                    </RectButton>
                );
            },
        });
    }, [navigation, userImage]);

    const handleRefetch = () => {
        setRefetching(true);
        refetch().finally(() => setRefetching(false));
    };

    const handleRename = (
        id: unknown,
        name: string,
        type?: "FileType" | "FolderType",
    ) => {
        switch (type) {
            case "FileType":
                updateFile({ variables: { id, name } });
                break;
            case "FolderType":
                updateFolder({ variables: { id, name } });
                break;
        }
        store.nameEditing = null;
    };

    const dataParsed = data?.contents || [];

    return (
        <Animated.FlatList
            data={dataParsed}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => (
                <FolderListItem
                    item={item}
                    editing={store.nameEditing?.id === item?.id}
                    onSubmitEditing={(name) =>
                        handleRename(item?.id, name, item?.__typename)
                    }
                    onCancelEditing={() => {
                        store.nameEditing = null;
                    }}
                />
            )}
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
            ListHeaderComponent={
                <SortMenu />
                // <View>
                //     <Pressable onPress={() => signOut()}>
                //         <Text>logout</Text>
                //     </Pressable>
                // </View>
            }
        />
    );
}
