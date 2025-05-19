import React from "react";
import { View, ScrollView } from "react-native";
import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import { Folder } from "@/global";
import Text from "@/components/Text";

const GET_FOLDER_INFO: TypedDocumentNode<
    { folderById: Folder },
    { id: string }
> = gql`
    query GetFolderInfo($id: UUID!) {
        folderById(id: $id) {
            id
            name
            createdAt
            user {
                email
            }
        }
    }
`;

interface Props {
    id: string;
}

export default function InfoFolder({ id }: Props) {
    const { data, loading, error } = useQuery(GET_FOLDER_INFO, {
        variables: { id },
    });

    if (loading) return <Text>Loading folder info...</Text>;
    if (error || !data?.folderById)
        return <Text>Error loading folder data.</Text>;

    const folder = data.folderById;
    const info = {
        Name: folder.name,
        "Created At": folder.createdAt,
        Owner: folder.user.email,
    };

    return (
        <ScrollView>
            <View className="flex flex-col gap-2 p-4">
                {Object.entries(info).map(([key, value]) => (
                    <View key={key}>
                        <Text variant="label">{key}</Text>
                        <Text variant="body">{value}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
