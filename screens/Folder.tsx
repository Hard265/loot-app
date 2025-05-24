import {
    FileType,
    FolderType,
    GetFolderContentsDocument,
    PutFileDocument,
    PutFolderDocument,
} from "@/__generated__/schema/graphql";
import List from "@/components/ui/List";
import { RootStackT } from "@/Router";
import { ongoingOpsStore } from "@/stores/OngoingOperationsStore";
import { useMutation, useQuery } from "@apollo/client";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
    NativeStackHeaderRightProps,
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { TextProps, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Animated, {
    Extrapolation,
    interpolate,
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
    const [refetching, setRefetching] = useState(false);
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

    const reanimatedScrollHandler = useAnimatedScrollHandler({
        onScroll(e) {
            titleOffset.value = interpolate(
                e.contentOffset.y,
                [0, 58],
                [32, 0],
                Extrapolation.CLAMP,
            );
        },
    });

    const handleRefetch = () => {
        setRefetching(true);
        refetch().finally(() => setRefetching(false));
    };

    const handleUpdateName = (
        data: Pick<FileType | FolderType, "id" | "__typename" | "name">,
    ) => {
        ongoingOpsStore.trackOperation("update", data.id as string);
        switch (data.__typename) {
            case "FileType":
                updateFile({ variables: { id: data.id, name: data.name } });
                break;
            case "FolderType":
                updateFolder({ variables: { id: data.id, name: data.name } });
                break;
        }
    };

    const list = [data?.contents!].flat().filter((item) => item !== null) as (
        | FileType
        | FolderType
    )[];

    return (
        <List
            data={list}
            onRefresh={handleRefetch}
            refreshing={refetching}
            isLoading={loading}
            onUpdate={handleUpdateName}
            operations={ongoingOperations}
            onScroll={reanimatedScrollHandler}
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
