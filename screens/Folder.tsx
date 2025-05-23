import {
    GetFolderContentsDocument,
    PutFileDocument,
    PutFolderDocument,
} from "@/__generated__/schema/graphql";
import Text from "@/components/Text";
import FolderListItem from "@/components/ui/FolderListItem";
import ListDisplayHeader from "@/components/ui/ListDisplayHeader";
import { RootStackT } from "@/Router";
import { ongoingOpsStore } from "@/stores/OngoingOperationsStore";
import { useMutation, useQuery } from "@apollo/client";
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
    RefreshControl,
    TextProps,
    View,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
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

export default function Folder() {
    const theme = useTheme();
    const route = useRoute<RouteProp<RootStackT, "Folder">>();
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackT, "Folder">>();
    const titleOffset = useSharedValue(32);
    const titleOffsetStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: titleOffset.value }],
    }));
    const { data, loading, refetch } = useQuery(GetFolderContentsDocument, {
        variables: {
            id: route.params.id,
        },
    });
    const [refreshing, setRefreshing] = useState(false);
    const [updateFile] = useMutation(PutFileDocument);
    const [updateFolder] = useMutation(PutFolderDocument);
    const [ongoingOperations, setOngoingOperations] = useState<Set<string>>(
        new Set(),
    );

    useEffect(() => {
        navigation.setOptions({
            title: data?.folderById?.name || "",
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

    useEffect(() => {
        const subscriber = ongoingOpsStore
            .getOngoingOperations()
            .subscribe((operations) => {
                setOngoingOperations(operations.get("update") || new Set());
            });
        return subscriber.unsubscribe;
    }, []);

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

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await refetch();
        } finally {
            setRefreshing(false);
        }
    }, [refetch]);

    const list = (data?.contents ?? []).filter(
        (item): item is NonNullable<typeof item> => item !== null,
    );

    const handleSubmit = (
        id: string,
        name: string,
        type: "FileType" | "FolderType",
    ): void => {
        ongoingOpsStore.trackOperation("update", id);
        switch (type) {
            case "FileType":
                updateFile({
                    variables: {
                        id,
                        name,
                    },
                });
                break;
            case "FolderType":
                updateFolder({
                    variables: { id, name },
                });
                break;
        }
    };
    return (
        <Animated.FlatList
            data={list}
            renderItem={({ item }) =>
                item && (
                    <FolderListItem
                        item={item}
                        hasActiveOperation={ongoingOperations.has(item.id)}
                        onSubmitEditing={(name) =>
                            handleSubmit(item.id, name, item.__typename!)
                        }
                    />
                )
            }
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
                <View className="w-ful flex flex-col">
                    <View className="flex items-center justify-center pb-2 pt-4">
                        <Text variant="largeTitle">
                            {data?.folderById?.name}
                        </Text>
                    </View>
                    {!loading && <ListDisplayHeader />}
                </View>
            }
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
