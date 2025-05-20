import useAuth from "@/hooks/useAuth";
import { RootStackT } from "@/Router";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import Text from "../components/Text";
import store from "@/stores";
import { getGravatarUri } from "@/utils";
import Avatar from "@/components/Avatar";

const LogoutButton: FC = () => {
    const { deleteUser } = useAuth();
    return (
        <RectButton onPress={() => deleteUser()}>
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
    const [userImage, setUserImage] = useState("");

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
    useEffect(() => {
        (async () => {
            setUserImage(
                await getGravatarUri(store.authStore.user?.email!, 200),
            );
        })();
    }, []);

    return (
        <ScrollView>
            <View className="flex flex-row items-start p-2">
                <View className="temes-center flex flex-row">
                    <Avatar uri={userImage} />
                    <View className="flex flex-col items-start">
                        <Text variant="title3">
                            {store.authStore.user?.email}
                        </Text>
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
