import ListItem from "@/components/ListItem";
import Text from "@/components/Text";
import useBackHandler from "@/hooks/useBackHandler";
import { useItemContext } from "@/hooks/useItemContext";
import { RootStackT } from "@/Router";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { cssInterop } from "nativewind";
import { ForwardedRef, useCallback, useState } from "react";
import { View } from "react-native";
import {
    ArrowDownTrayIcon,
    ArrowsPointingOutIcon,
    CloudArrowDownIcon,
    ExclamationCircleIcon,
    PencilIcon,
    TrashIcon,
    UserGroupIcon,
    UserPlusIcon,
} from "react-native-heroicons/outline";
import { useStore } from "@/contexts/StoreContext";
interface ItemSheetProps {
    ref: ForwardedRef<BottomSheet>;
    onClose?(): void;
}

cssInterop(BottomSheet, {
    backgroundClassName: "backgroundStyle",
    handleIndicatorClassName: "handleIndicatorStyle",
});

export default function ItemSheet(props: ItemSheetProps) {
    const theme = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackT>>();
    const { data } = useItemContext();
    const store = useStore();
    const [isShown, setIsShown] = useState(false);

    const handleSheetChange = (index: number) => {
        setIsShown(index >= 0);
    };
    useBackHandler(isShown, () => {
        //@ts-ignore
        props.ref.current?.close();
    });

    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
        return (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        );
    }, []);

    const isFile = data?.__typename === "FileType";
    const timestamp = dayjs(data?.createdAt).format("MMM DD, YYYY");
    return (
        <BottomSheet
            ref={props.ref}
            enablePanDownToClose
            index={-1}
            backdropComponent={renderBackdrop}
            onChange={handleSheetChange}
            //@ts-ignore
            backgroundClassName="bg-secondary rounded-none"
            handleIndicatorClassName="bg-text"
            onClose={() => props.onClose?.()}
        >
            <BottomSheetView className="flex flex-col">
                <View className="flex flex-col items-start p-4 pt-0.5">
                    <Text variant="largeTitle">{data?.name}</Text>
                    <Text>{timestamp}</Text>
                </View>

                <ListItem
                    title="Raname"
                    icon={
                        <PencilIcon
                            size={20}
                            color={theme.colors.text}
                        />
                    }
                    onTap={() => {
                        store.nameEditing = {
                            id: data?.id,
                            type: data?.__typename!,
                        };
                    }}
                />
                <ListItem
                    title="Share"
                    icon={
                        <UserPlusIcon
                            size={20}
                            color={theme.colors.text}
                        />
                    }
                />
                <ListItem
                    title="Manage access"
                    icon={
                        <UserGroupIcon
                            size={20}
                            color={theme.colors.text}
                        />
                    }
                />
                <ListItem
                    title="Move"
                    icon={
                        <ArrowsPointingOutIcon
                            size={20}
                            color={theme.colors.text}
                        />
                    }
                />
                <ListItem
                    title="Make available offline"
                    icon={
                        <CloudArrowDownIcon
                            size={20}
                            color={theme.colors.text}
                        />
                    }
                />
                <ListItem
                    title="Download"
                    icon={
                        <ArrowDownTrayIcon
                            size={20}
                            color={theme.colors.text}
                        />
                    }
                />
                <ListItem
                    title={`${isFile ? "File" : "Folder"} details`}
                    icon={
                        <ExclamationCircleIcon
                            size={20}
                            color={theme.colors.text}
                        />
                    }
                    onTap={() => {
                        // navigation.navigate("Info", {
                        //     id: data!.id,
                        //     type: isFile ? "file" : "folder",
                        //     data: data,
                        // });
                    }}
                />
                <ListItem
                    title="Permanetly delete"
                    icon={
                        <TrashIcon
                            size={20}
                            color={theme.colors.text}
                        />
                    }
                />
            </BottomSheetView>
        </BottomSheet>
    );
}
