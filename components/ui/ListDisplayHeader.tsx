import { showOptions } from "@/layouts/OptionsManagerLayout";
import { useTheme } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import {
    CalendarDaysIcon,
    ArrowDownIcon,
    Squares2X2Icon,
    ListBulletIcon,
} from "react-native-heroicons/outline";
import Text from "../Text";

export default function ListDisplayHeader() {
    const { colors } = useTheme();

    return (
        <View className="flex-row items-center justify-between bg-background p-4">
            <Pressable
                onPress={() => {
                    showOptions([
                        {
                            label: "Size",
                            value: "size",
                            icon: (
                                <CalendarDaysIcon
                                    size={24}
                                    color={colors.text}
                                />
                            ),
                        },
                        {
                            label: "Date Modified",
                            value: "dateModified",
                            icon: (
                                <CalendarDaysIcon
                                    size={24}
                                    color={colors.text}
                                />
                            ),
                        },
                    ]);
                }}
                className="flex-row items-center gap-2 bg-background"
            >
                <Text variant="title3">Name</Text>
                <ArrowDownIcon
                    size={16}
                    color={colors.text}
                />
            </Pressable>
            <Pressable
                onPress={() => {
                    showOptions([
                        {
                            label: "Grid",
                            value: "grid",
                            icon: (
                                <Squares2X2Icon
                                    size={24}
                                    color={colors.text}
                                />
                            ),
                        },
                        {
                            label: "List",
                            value: "list",
                            icon: (
                                <ListBulletIcon
                                    size={24}
                                    color={colors.text}
                                />
                            ),
                        },
                    ]);
                }}
            >
                <Squares2X2Icon
                    size={20}
                    color={colors.text}
                />
            </Pressable>
        </View>
    );
}
