import React from "react";
import { View, Text, Button, Share } from "react-native";

const ShareScreen = () => {
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: "Check out this awesome link: https://example.com",
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log(
                        "Shared with activity type:",
                        result.activityType,
                    );
                } else {
                    console.log("Shared successfully");
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("Share dismissed");
            }
        } catch (error) {
            console.error("Error sharing:", error);
        }
    };

    return (
        <View className="flex-1 items-center justify-center p-4">
            <Text className="mb-4 text-xl">Share This Link</Text>
            <Button
                title="Share"
                onPress={onShare}
            />
        </View>
    );
};

export default ShareScreen;
