import {
    FileType,
    FolderType,
    GetRootContentsDocument,
    PutFileDocument,
    PutFolderDocument,
} from "@/__generated__/schema/graphql";
import List from "@/components/ui/List";
import UserHeaderLeft from "@/components/ui/UserHeaderRight";
import { RootStackT } from "@/Router";
import { ongoingOpsStore } from "@/stores/OngoingOperationsStore";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { cssInterop } from "nativewind";
import React, { useEffect, useState } from "react";
import Skeleton from "react-native-reanimated-skeleton";

type NavigationProp = NativeStackNavigationProp<RootStackT, "Home">;

cssInterop(Skeleton, {
    className: "containerStyle",
});

function Home() {
    const theme = useTheme();
    const navigation = useNavigation<NavigationProp>();

    const { data, loading, refetch } = useQuery(GetRootContentsDocument);
    const [refetching, setRefetching] = useState(false);

    const [updateFile] = useMutation(PutFileDocument);
    const [updateFolder] = useMutation(PutFolderDocument);

    const [ongoingOperations, setOngoingOperations] = useState<Set<string>>(
        new Set(),
    );

    useEffect(() => {
        navigation.setOptions({
            title: "",
            headerLeft: () => <UserHeaderLeft />,
        });
    }, [navigation, theme, theme.dark]);

    useEffect(() => {
        const subscriber = ongoingOpsStore
            .getOngoingOperations()
            .subscribe((operations) => {
                setOngoingOperations(operations.get("update") || new Set());
            });
        return subscriber.unsubscribe;
    }, []);

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
        />
    );
}
export default Home;
