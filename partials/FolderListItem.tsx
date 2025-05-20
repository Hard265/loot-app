import { GetFolderContentsQuery } from "@/__generated__/schema/graphql";
import ListItem from "@/components/ListItem";
import { useItemContext } from "@/hooks/useItemContext";
import { RootStackT } from "@/Router";
import { formatBytes } from "@/utils";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import React from "react";
import { DocumentIcon, FolderIcon } from "react-native-heroicons/outline";

interface FolderListItemProps {
    item: NonNullable<GetFolderContentsQuery["contents"]>[number];
}

export default function FolderListItem({ item }: FolderListItemProps) {
    const { showItemContext } = useItemContext();
    const theme = useTheme();
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackT, "Folder">>();
    const datestamp = dayjs(item?.createdAt).format("MMM DD, YYYY");

    return item?.__typename === "FileType" ? (
        <ListItem
            icon={
                <DocumentIcon
                    size={28}
                    color={theme.colors.text}
                />
            }
            title={item.name}
            subtitle={datestamp}
            trailing={formatBytes(item.size, 1)}
            onLongTap={() => showItemContext(item!)}
        />
    ) : (
        <ListItem
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
            title={item!.name}
            subtitle={datestamp}
        />
    );
}
