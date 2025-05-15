import ListItem from "@/components/ListItem";
import Menu from "@/components/Menu";
import MenuItem from "@/components/MenuItem";
import Text from "@/components/Text";
import useAuth from "@/hooks/useAuth";
import useUiFeedback from "@/hooks/useUiFeedback";
import { RootStackT } from "@/Router";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import {
    ArrowDownIcon,
    FolderIcon,
    CalendarIcon,
} from "react-native-heroicons/outline";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type navigationProp = NativeStackNavigationProp<RootStackT, "Home">;

export default function Home() {
    const navigation = useNavigation<navigationProp>();
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const { menu } = useUiFeedback();
    const [headerHeight, setHeaderHeight] = useState(0);
    const scrollY = useSharedValue(0);

    const headerAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: scrollY.value }],
    }));

    useEffect(() => {
        // navigation.setOptions({
        //     headerTransparent: true,
        //     header() {
        //         return (
        //             <Animated.View
        //                 style={[
        //                     { paddingTop: insets.top },
        //                     headerAnimatedStyle,
        //                 ]}
        //                 className=""
        //                 onLayout={(e) =>
        //                     setHeaderHeight(e.nativeEvent.layout.height)
        //                 }
        //             >
        //                 <View className="p-4">
        //                     <Text
        //                         variant="heading"
        //                         color="secondary"
        //                     >
        //                         Heading
        //                     </Text>
        //                 </View>
        //             </Animated.View>
        //         );
        //     },
        // });
    }, [insets.top, navigation, headerAnimatedStyle]);

    const reanimatedScrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = interpolate(
                event.contentOffset.y,
                [0, headerHeight],
                [0, -headerHeight],
                Extrapolation.CLAMP,
            );
        },
    });

    const data = [{ name: "libs" }, { name: "libs" }, { name: "libs" }];

    const renderItem = (props: any) => {
        return (
            <ListItem
                title={props.item.name}
                icon={
                    <FolderIcon
                        size={24}
                        color={theme.colors.text}
                    />
                }
            />
        );
    };

    return (
        <Animated.FlatList
            data={data}
            onScroll={reanimatedScrollHandler}
            scrollEventThrottle={16}
            contentContainerClassName="pb-[2000]"
            renderItem={renderItem}
            // StickyHeaderComponent={(props) => {
            //     console.log(props);
            //     return <Text>Sticky</Text>;
            // }}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
                <View className="bg-background">
                    <Pressable
                        className="flex flex-row gap-2 p-2"
                        onPress={async () =>
                            await menu(({ dismiss, select }) => (
                                <Menu
                                    onSelect={select}
                                    title="Sort by"
                                >
                                    <MenuItem
                                        value="name"
                                        icon={
                                            <CalendarIcon
                                                color={theme.colors.text}
                                            />
                                        }
                                    >
                                        Name
                                    </MenuItem>
                                    <MenuItem
                                        value="modified"
                                        icon={
                                            <CalendarIcon
                                                color={theme.colors.text}
                                            />
                                        }
                                    >
                                        Date created
                                    </MenuItem>
                                    <MenuItem
                                        value="name"
                                        icon={
                                            <CalendarIcon
                                                color={theme.colors.text}
                                            />
                                        }
                                    >
                                        Size
                                    </MenuItem>
                                    <MenuItem
                                        value="name"
                                        icon={
                                            <CalendarIcon
                                                color={theme.colors.text}
                                            />
                                        }
                                    >
                                        File type
                                    </MenuItem>
                                </Menu>
                            ))
                        }
                    >
                        <Text>Name</Text>
                        <ArrowDownIcon
                            color={theme.colors.text}
                            size={20}
                        />
                    </Pressable>
                </View>
            }
        />
    );
}

// {/* <Pressable onPress={() => signOut()}>
//     <Text>logout</Text>
// </Pressable> */}
