import React, { useMemo } from "react";
import { View, Pressable } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate,
    Extrapolation,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ArrowDownIcon, FolderIcon } from "react-native-heroicons/outline";

import ListItem from "@/components/ListItem";
// import Menu from "@/components/Menu";
import Text from "@/components/Text";
// import useUiFeedback from "@/hooks/useUiFeedback";
import { RootStackT } from "@/Router";

type NavigationProp = NativeStackNavigationProp<RootStackT, "Home">;

const Header = ({ animatedStyle }: { animatedStyle: any }) => {
    const insets = useSafeAreaInsets();
    return (
        <Animated.View
            style={[
                { paddingTop: insets.top, paddingHorizontal: 16 },
                animatedStyle,
            ]}
            className="bg-background"
        >
            <Text
                variant="heading"
                color="secondary"
            >
                Heading
            </Text>
        </Animated.View>
    );
};

const SortMenu = ({ onSort }: { onSort: (value: string) => void }) => {
    // const { menu } = useUiFeedback();

    const menuItems = useMemo(
        () => [
            { value: "name", label: "Name" },
            { value: "modified", label: "Date Created" },
            { value: "size", label: "Size" },
            { value: "type", label: "File Type" },
        ],
        [],
    );

    const handleSort = async () => {
        /*await menu(({ dismiss, select }) => (
            <Menu
                onSelect={select}
                title="Sort by"
                items={menuItems}
            />
        )).then(onSort);
        */
    };

    return (
        <Pressable
            onPress={handleSort}
            className="flex-row items-center gap-2 p-2"
        >
            <Text>Name</Text>
            <ArrowDownIcon size={20} />
        </Pressable>
    );
};

export default function Home() {
    const theme = useTheme();
    const navigation = useNavigation<NavigationProp>();
    const [headerHeight, setHeaderHeight] = React.useState(0);
    const scrollY = useSharedValue(0);

    const headerAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: scrollY.value }],
    }));

    const reanimatedScrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = interpolate(
            event.contentOffset.y,
            [0, headerHeight],
            [0, -headerHeight],
            Extrapolation.CLAMP,
        );
    });

    const data = useMemo(() => Array(10).fill({ name: "libs" }), []);

    const renderItem = ({ item }: { item: { name: string } }) => (
        <ListItem
            title={item.name}
            icon={
                <FolderIcon
                    size={24}
                    color={theme.colors.text}
                />
            }
        />
    );

    return (
        <Animated.FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            onScroll={reanimatedScrollHandler}
            contentContainerClassName="pb-[2000]"
            renderItem={renderItem}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
                <View>
                    <Header animatedStyle={headerAnimatedStyle} />
                    <SortMenu
                        onSort={(value) => console.log("Sorted by", value)}
                    />
                </View>
            }
        />
    );
}
