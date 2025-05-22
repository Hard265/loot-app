import { GetFolderContentsQuery } from "@/__generated__/schema/graphql";
import ListItem from "@/components/ListItem";
import { useItemContext } from "@/hooks/useItemContext";
import { RootStackT } from "@/Router";
import { formatBytes } from "@/utils";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import React from "react";
import {
    DocumentIcon,
    FolderIcon,
    UserGroupIcon,
    UsersIcon,
} from "react-native-heroicons/outline";

interface FolderListItemProps {
    item: NonNullable<GetFolderContentsQuery["contents"]>[number];
    onSubmitEditing?(name: string): void;
    editing?: boolean;
    onCancelEditing?(): void;
}

export default function FolderListItem({
    item,
    editing,
    onCancelEditing,
    onSubmitEditing,
}: FolderListItemProps) {
    const { showItemContext } = useItemContext();
    const theme = useTheme();
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackT, "Folder">>();
    const datestamp = dayjs(item?.createdAt).format("MMM DD, YYYY");

    const renderIsSharedIcon =
        item?.hasShareLinks ?
            <UserGroupIcon
                size={16}
                color={theme.colors.primary}
            />
        : item?.hasShares ?
            <UsersIcon
                size={16}
                color={theme.colors.primary}
            />
        :   undefined;

    const handleRename = (name: string) => {
        const _name = name.trim();
        if (_name === "") return onCancelEditing?.();
        onSubmitEditing?.(_name);
    };

    return item?.__typename === "FileType" ?
            <ListItem
                icon={
                    <DocumentIcon
                        size={28}
                        color={theme.colors.text}
                    />
                }
                editing={editing}
                onSubmit={(str: string) => handleRename(str)}
                title={item.name}
                subtitle={datestamp}
                subtitleLeading={renderIsSharedIcon}
                trailing={formatBytes(item.size, 1)}
                onLongTap={() => showItemContext(item!)}
            />
        :   <ListItem
                onTap={() => {
                    navigation.push("Folder", {
                        id: item!.id,
                    });
                }}
                onLongTap={() => showItemContext(item!)}
                icon={
                    <FolderIcon
                        size={28}
                        color={theme.colors.text}
                    />
                }
                editing={editing}
                onSubmit={(str: string) => handleRename(str)}
                title={item!.name}
                subtitle={datestamp}
                subtitleLeading={renderIsSharedIcon}
            />;
}
