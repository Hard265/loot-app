import Text from "@/components/Text";
import { RootStackT } from "@/Router";
import { useQuery } from "@apollo/client";
import {
    RouteProp,
    useNavigation,
    useRoute,
    useTheme,
} from "@react-navigation/native";
import {
    NativeStackHeaderRightProps,
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    TextProps,
    View,
    RefreshControl,
} from "react-native";
import {
    ArrowDownIcon,
    MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Animated, {
    Extrapolation,
    FadeIn,
    FadeOut,
    interpolate,
    LinearTransition,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import FolderListItem from "@/partials/FolderListItem";
import { RectButton } from "react-native-gesture-handler";
import { gql } from "@/__generated__";

const GET_FOLDER = gql(/* GraphQL */ `
    query GetFolderContents($id: UUID!) {
        contents(folderId: $id) {
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
        folderById(id: $id) {
            id
            name
            parentFolder {
                createdAt
                id
                name
                user {
                    email
                    id
                }
            }
            hasShareLinks
            hasShares
            createdAt
        }
    }
`);

const UPDATE_FILE = gql(/* GraphQL */ `
    mutation UpdateFile($id: UUID!, $name: String!) {
        updateFile(id: $id, name: $name) {
            file {
                name
            }
        }
    }
`);

const HeaderTitle: FC<PropsWithChildren<{ style: TextProps["style"] }>> = (
    props,
) => {
    return (
        <View className="overflow-hidden">
            <Animated.Text
                className="translate-y-8 font-[MontrealMedium] text-2xl color-text"
                style={props.style}
            >
                {props.children}
            </Animated.Text>
        </View>
    );
};

const ListHeader: FC<{ title: string }> = (props) => {
    return (
        <View className="w-ful flex flex-col">
            <View className="flex items-center justify-center pb-2 pt-4">
                <Text variant="largeTitle">{props.title}</Text>
            </View>
            <SortMenu />
        </View>
    );
};

const SortMenu = () => {
    const { colors } = useTheme();

    return (
        <Pressable className="flex-row items-center gap-2 bg-background p-4">
            <Text variant="title3">Name</Text>
            <ArrowDownIcon
                size={16}
                color={colors.text}
            />
        </Pressable>
    );
};

export default function Folder() {
    const theme = useTheme();
    const route = useRoute<RouteProp<RootStackT, "Folder">>();
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackT, "Folder">>();

    const titleOffset = useSharedValue(32);
    const titleOffsetStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: titleOffset.value }],
    }));

    const { data, loading, refetch } = useQuery(GET_FOLDER, {
        variables: { id: route.params.id },
    });

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await refetch();
        } finally {
            setRefreshing(false);
        }
    }, [refetch]);

    useEffect(() => {
        navigation.setOptions({
            title: data?.folderById.name || "",
            headerTitle({ children }) {
                return (
                    <HeaderTitle style={titleOffsetStyle}>
                        {children}
                    </HeaderTitle>
                );
            },
            headerRight: (props) => <HeaderRight {...props} />,
        });
    }, [data, navigation, titleOffsetStyle]);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll(e) {
            titleOffset.value = interpolate(
                e.contentOffset.y,
                [0, 58],
                [32, 0],
                Extrapolation.CLAMP,
            );
        },
    });

    const list = [data?.folders || [], data?.files || []].flat(1);

    return (
        <Animated.FlatList
            data={list}
            renderItem={({ item }) => <FolderListItem item={item} />}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    tintColor={theme.colors.primary}
                    progressBackgroundColor={theme.colors.background}
                    onRefresh={onRefresh}
                />
            }
            onScroll={scrollHandler}
            keyExtractor={({ id }) => id}
            // stickyHeaderIndices={[0]}
            ListHeaderComponent={
                <ListHeader title={data?.folderById.name || ""} />
            }
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

function HeaderRight(props: NativeStackHeaderRightProps) {
    return (
        <View>
            <RectButton>
                <MagnifyingGlassIcon
                    size={24}
                    color={props.tintColor}
                />
            </RectButton>
        </View>
    );
}
