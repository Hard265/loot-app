import { Link, useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import {
    ArrowDownIcon,
    DocumentTextIcon,
    FolderIcon,
} from "react-native-heroicons/outline";
import Animated, {
    FadeIn,
    FadeOut,
    LinearTransition,
} from "react-native-reanimated";

import ListItem from "@/components/ListItem";
// import Menu from "@/components/Menu";
import Text from "@/components/Text";
// import useUiFeedback from "@/hooks/useUiFeedback";
import Avatar from "@/components/Avatar";
import { File, Folder } from "@/global";
import { RootStackT } from "@/Router";
import store from "@/stores";
import { getGravatarUri } from "@/utils";
import { gql, useQuery } from "@apollo/client";

type NavigationProp = NativeStackNavigationProp<RootStackT, "Home">;

const GET_FOLDER_CONTENTS = gql`
    query GetFolderContents($id: UUID) {
        folders(parentFolderId: $id) {
            id
            name
            createdAt
        }
        files(folderId: $id) {
            id
            name
            size
            file
            createdAt
        }
    }
`;

const SortMenu = () => {
    const { colors } = useTheme();

    return (
        <>
            <Pressable className="flex-row items-center gap-2 bg-background p-2">
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
    const { data, loading } = useQuery<{
        files: File[];
        folders: Folder[];
    }>(GET_FOLDER_CONTENTS, { variables: { id: null } });

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
                return <Avatar uri={userImage} />;
            },
        });
    }, [navigation, userImage]);

    const renderItem = ({ item: { id, ...item } }: { item: Folder | File }) => {
        return "size" in item ? (
            <ListItem
                title={item.name}
                icon={
                    <DocumentTextIcon
                        size={24}
                        color={theme.colors.text}
                    />
                }
            />
        ) : (
            <ListItem
                title={item.name}
                onTap={() => {
                    navigation.push("Folder", { id });
                }}
                icon={
                    <FolderIcon
                        size={24}
                        color={theme.colors.text}
                    />
                }
            />
        );
    };

    const dataParsed = [...(data?.folders || []), ...(data?.files || [])];

    return (
        <Animated.FlatList
            data={dataParsed}
            keyExtractor={(_, index) => index.toString()}
            contentContainerClassName="pb-[2000]"
            renderItem={renderItem}
            stickyHeaderIndices={[0]}
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
