import ListItem from "@/components/ListItem";
import Text from "@/components/Text";
import useBackHandler from "@/hooks/useBackHandler";
import { useItemContext } from "@/hooks/useItemContext";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import dayjs from "dayjs";
import { cssInterop } from "nativewind";
import { ForwardedRef, useCallback, useState } from "react";
import { View } from "react-native";
import {
    ArrowDownOnSquareStackIcon,
    ArrowDownTrayIcon,
    ArrowsPointingOutIcon,
    ExclamationCircleIcon,
    PencilIcon,
    SignalSlashIcon,
    TrashIcon,
    UserGroupIcon,
    UserPlusIcon,
} from "react-native-heroicons/outline";

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
    const { data } = useItemContext();
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
                <View className="flex flex-col items-start border-b border-text/15 p-4 pt-0.5">
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
                        <SignalSlashIcon
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
                    title="Details"
                    icon={
                        <ExclamationCircleIcon
                            size={20}
                            color={theme.colors.text}
                        />
                    }
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
