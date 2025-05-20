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
import { File, Folder } from "@/global";
import { RootStackT } from "@/Router";
import store from "@/stores";
import { getGravatarUri } from "@/utils";
import { useQuery } from "@apollo/client";
import { RectButton } from "react-native-gesture-handler";
import FolderListItem from "@/partials/FolderListItem";

import { gql } from "__generated__";

type NavigationProp = NativeStackNavigationProp<RootStackT, "Home">;

const GET_CONTENTS = gql(/* GraphQL */ `
    query GetContents {
        contents {
            ... on FolderType {
                id
                name
                hasShareLinks
                hasShares
                createdAt
            }
            ... on FileType {
                id
                name
                hasShareLinks
                file
                createdAt
                hasShares
                mimeType
                size
            }
        }
    }
`);

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
    const [userImage, setUserImage] = useState("");
    const { data, loading, refetch } = useQuery(GET_CONTENTS);
    const [refetching, setRefetching] = useState(false);

    useEffect(() => {
        (async () => {
            setUserImage(
                await getGravatarUri(store.authStore.user?.email!, 80),
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

    const dataParsed = data?.contents || [];

    return (
        <Animated.FlatList
            data={dataParsed}
            keyExtractor={(_, index) => index.toString()}
            contentContainerClassName="pb-[2000]"
            renderItem={({ item }) => <FolderListItem item={item} />}
            stickyHeaderIndices={[0]}
            onRefresh={handleRefetch}
            refreshing={refetching}
            ListFooterComponent={
                loading ? (
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
                ) : null
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
