import ListItem from "@/components/ListItem";
import Text from "@/components/Text";
import { RootStackT } from "@/Router";
import { gql, useQuery } from "@apollo/client";
import {
    RouteProp,
    useNavigation,
    useRoute,
    useTheme,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, TextProps, View } from "react-native";
import {
    ArrowDownIcon,
    DocumentTextIcon,
    FolderIcon,
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
        <View className="p-4">
            <Text variant="largeTitle">{props.title}</Text>
            <SortMenu />
        </View>
    );
};

const SortMenu = () => {
    const { colors } = useTheme();

    return (
        <Pressable className="flex-row items-center gap-2 bg-background p-2">
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
            renderItem={({ item }) =>
                "size" in item ? (
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
                        onTap={() => {
                            navigation.push("Folder", {
                                id: item.id,
                            });
                        }}
                        icon={
                            <FolderIcon
                                size={20}
                                color={theme.colors.text}
                            />
                        }
                        title={item.name}
                    />
                )
            }
            onScroll={scrollHandler}
            keyExtractor={({ id }) => id}
            stickyHeaderIndices={[0]}
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
            refreshing={refreshing}
            onRefresh={onRefresh}
        />
    );
}
