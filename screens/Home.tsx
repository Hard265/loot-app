import {
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

    // const handleSubmitRename = (
    //     id: unknown,
    //     name: string,
    //     type?: "FileType" | "FolderType",
    // ) => {
    //     ongoingOpsStore.trackOperation("update", id as string);
    //     switch (type) {
    //         case "FileType":
    //             updateFile({ variables: { id, name } });
    //             break;
    //         case "FolderType":
    //             updateFolder({ variables: { id, name } });
    //             break;
    //     }
    // };

    return (
        <List
            data={[data?.contents].flat()}
            onRefresh={handleRefetch}
            refreshing={refetching}
            isLoading={loading}
        />
    );
}
export default Home;
