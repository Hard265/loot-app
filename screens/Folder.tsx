import ListItem from "@/components/ListItem";
import Text from "@/components/Text";
import { RootStackT } from "@/Router";
import { gql, useQuery } from "@apollo/client";
import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute,
    useTheme,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import {
    ArrowDownIcon,
    DocumentTextIcon,
} from "react-native-heroicons/outline";
import {FolderIcon} from "react-native-heroicons/solid";
import Animated, {
    FadeIn,
    FadeOut,
    LinearTransition,
} from "react-native-reanimated";

const GET_FOLDER = gql`
    query GetFolderById($id: UUID!) {
        folderById(id: $id) {
            id
            name
            createdAt
            parentFolder {
                id
                name
            }
            user {
                id
                email
            }
        }
        folders(parentFolderId: $id) {
            name
            createdAt
            id
        }
        files(folderId: $id) {
            name
            size
            createdAt
            id
            file
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

export default function Folder() {
    const theme = useTheme();
    const route = useRoute<RouteProp<RootStackT, "Folder">>();
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackT, "Folder">>();
    const { data, loading } = useQuery(GET_FOLDER, {
        variables: { id: route.params.id },
    });

    useEffect(() => {
        navigation.setOptions({
            title: data.folderById.name,
        });
    }, [data, navigation]);

    const list = [data?.folders || [], data?.files || []].flat(1);

    return (
        <Animated.FlatList
            data={list}
            renderItem={({ item }) => {
                return "size" in item ? (
                    <ListItem
                        icon={
                            <DocumentTextIcon
                                size={20}
                                color={theme.colors.text}
                            />
                        }
                        title={item.name}
                    />
                ) : (
                    <ListItem
                        icon={
                            <FolderIcon
                                size={20}
                                color={theme.colors.text}
                            />
                        }
                        title={item.name}
                    />
                );
            }}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={<SortMenu />}
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
        />
    );
}
