import React from "react";
import { View, ScrollView } from "react-native";
import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import { File } from "@/global";
import Text from "@/components/Text";

const GET_FILE_INFO: TypedDocumentNode<{ fileById: File }, { id: string }> =
    gql`
        query GETFILEINFO($id: UUID!) {
            fileById(id: $id) {
                id
                name
                size
                createdAt
                user {
                    email
                }
                folder {
                    name
                }
            }
        }
    `;

interface Props {
    id: string;
}

export default function InfoFile({ id }: Props) {
    const { data, loading, error } = useQuery(GET_FILE_INFO, {
        variables: { id },
    });

    if (loading) return <Text>Loading file info...</Text>;
    if (error || !data?.fileById) return <Text>Error loading file data.</Text>;

    const file = data.fileById;
    const info = {
        Name: file.name,
        Size: `${file.size} bytes`,
        "Created At": file.createdAt,
        Owner: file.user.email,
        "Folder Name": file.folder?.name || "None",
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
