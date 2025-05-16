import { FC } from "react";
import { Image, View } from "react-native";

const Avatar: FC<{ uri: string }> = ({ uri }) => {
    return (
        <View className="size-12 rounded-full">
            {uri && (
                <Image
                    source={{ uri }}
                    className="h-full w-full"
                />
            )}
        </View>
    );
};

export default Avatar;
