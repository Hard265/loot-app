import { ScrollView, View, Image } from "react-native";
import Text from "../components/Text";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackT } from "@/Router";
import { FC, useEffect } from "react";
import { RectButton } from "react-native-gesture-handler";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import useAuth from "@/hooks/useAuth";

const LogoutButton: FC = () => {
    const { signOut } = useAuth();
    return (
        <RectButton onPress={() => signOut()}>
            <Text
                variant="label"
                color="error"
            >
                logout
            </Text>
        </RectButton>
    );
};

export default function User() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackT, "User">>();

    useEffect(() => {
        navigation.setOptions({
            headerRight({ tintColor }) {
                return (
                    <RectButton>
                        <QuestionMarkCircleIcon
                            size={24}
                            color={tintColor}
                        />
                    </RectButton>
                );
            },
        });
    }, [navigation]);

    return (
        <ScrollView>
            <View className="flex flex-row items-start p-2">
                <View className="flex flex-row temes-center">
                    <Image className="size-24"></Image>
                    <View className="flex flex-col items-start">
                        <Text variant="title2">[mail address]</Text>
                    </View>
                </View>
                <View className="w-full">
                    {/*                    <ProgressIndicator />*/}
                </View>
            </View>
            <View>
                <LogoutButton />
            </View>
        </ScrollView>
    );
}
