import { FileType, FolderType } from "@/__generated__/schema/graphql";
import { showOptions } from "@/layouts/OptionsManagerLayout";
import { RootStackT } from "@/Router";
import { formatBytes } from "@/utils";
import { Theme, useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { useState } from "react";
import { RefreshControl } from "react-native";
import {
    ArrowDownTrayIcon,
    ArrowsPointingOutIcon,
    CloudArrowDownIcon,
    DocumentIcon,
    ExclamationCircleIcon,
    FolderIcon,
    PencilIcon,
    TrashIcon,
    UserGroupIcon,
    UserPlusIcon,
} from "react-native-heroicons/outline";
import Animated from "react-native-reanimated";
import ListItem from "../ListItem";
import ListItemSkeleton from "../ListItemSkeleton";
import ListDisplayHeader from "./ListDisplayHeader";

type navigationProp = NativeStackNavigationProp<RootStackT, "Home">;

interface ListProps {
    data: (FolderType | FileType)[];
    isLoading?: boolean;
    onRefresh?(): void;
    refreshing?: boolean;
    onUpdate?(
        updates: Pick<FileType | FolderType, "id" | "__typename" | "name">,
    ): void;
    operations?: string[];
}

export default function List(props: ListProps) {
    const theme = useTheme();
    const navigation = useNavigation<navigationProp>();
    const [editingId, setEditingId] = useState<string>("");

    const renderItem = ({ item }: { item: FolderType | FileType }) => {
        const timestamp = dayjs(item.createdAt).format("MMM DD, YY");
        return item.__typename === "FileType" ?
                <ListItem
                    title={item.name}
                    editing={editingId === item.id}
                    icon={
                        <DocumentIcon
                            size={24}
                            color={theme.colors.text}
                        />
                    }
                    subtitle={timestamp}
                    trailing={formatBytes(item.size, 1)}
                    onLongTap={async () => {
                        const response = await showOptions(
                            baseOptions(theme, "File"),
                            {
                                title: item.name,
                                subtitle: timestamp,
                            },
                        );
                        switch (response) {
                            case "rename":
                                setEditingId(item.id);
                                break;
                        }
                    }}
                />
            :   <ListItem
                    title={item.name}
                    subtitle={timestamp}
                    editing={editingId === item.id}
                    icon={
                        <FolderIcon
                            size={24}
                            color={theme.colors.text}
                        />
                    }
                    onTap={() => navigation.navigate("Folder", { id: item.id })}
                    onLongTap={() => {
                        showOptions(baseOptions(theme, "Folder"), {
                            title: item.name,
                            subtitle: timestamp,
                        }).then((response) => {
                            switch (response) {
                                case "rename":
                                    setEditingId(item.id);
                                    break;
                            }
                        });
                    }}
                    onSubmit={(name) => {
                        props.onUpdate?.({
                            id: item.id,
                            __typename: item.__typename,
                            name,
                        });
                    }}
                />;
    };
    return (
        <Animated.FlatList
            data={props.data.filter(Boolean)}
            renderItem={renderItem}
            keyExtractor={({ id }) => id}
            refreshControl={
                <RefreshControl
                    refreshing={!!props.refreshing}
                    colors={[theme.colors.primary]}
                    tintColor={theme.colors.primary}
                    progressBackgroundColor={theme.colors.background}
                    onRefresh={props.onRefresh}
                />
            }
            ListHeaderComponent={<ListDisplayHeader />}
            ListFooterComponent={
                <ListItemSkeleton isLoading={!!props.isLoading} />
            }
        />
    );
}

const baseOptions = (theme: Theme, type: "File" | "Folder") => [
    {
        label: "Rename",
        value: "rename",
        icon: (
            <PencilIcon
                size={20}
                color={theme.colors.text}
            />
        ),
    },
    {
        label: "Share",
        value: "share",
        icon: (
            <UserPlusIcon
                size={20}
                color={theme.colors.text}
            />
        ),
    },
    {
        label: "Manage access",
        value: "manage-access",
        icon: (
            <UserGroupIcon
                size={20}
                color={theme.colors.text}
            />
        ),
    },
    {
        label: "Move",
        value: "move",
        icon: (
            <ArrowsPointingOutIcon
                size={20}
                color={theme.colors.text}
            />
        ),
    },
    {
        label: "Make available offline",
        value: "offline",
        icon: (
            <CloudArrowDownIcon
                size={20}
                color={theme.colors.text}
            />
        ),
    },
    {
        label: "Download",
        value: "download",
        icon: (
            <ArrowDownTrayIcon
                size={20}
                color={theme.colors.text}
            />
        ),
    },
    {
        label: "Permanently delete",
        value: "delete",
        icon: (
            <TrashIcon
                size={20}
                color={theme.colors.text}
            />
        ),
    },
    {
        label: `${type} details`,
        value: "details",
        icon: (
            <ExclamationCircleIcon
                size={20}
                color={theme.colors.text}
            />
        ),
    },
];
