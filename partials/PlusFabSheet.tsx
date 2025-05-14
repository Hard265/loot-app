import Text from "@/components/Text";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { cssInterop } from "nativewind";
import { ForwardedRef, ReactNode, useCallback } from "react";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import {
    CameraIcon,
    CloudArrowUpIcon,
    DocumentMagnifyingGlassIcon,
    FolderPlusIcon,
    PhotoIcon,
} from "react-native-heroicons/outline";

cssInterop(BottomSheet, {
    backgroundClassName: "backgroundStyle",
    handleIndicatorClassName: "handleIndicatorStyle",
});

cssInterop(RectButton, { className: "style" });

interface PlusFabSheetProps {
    ref: ForwardedRef<BottomSheet>;
    onDismiss(): void;
    onShown(): void;
}

const iconSize = 28;

export default function PlusFabSheet(props: PlusFabSheetProps) {
    const { colors } = useTheme();

    const opts: { icon: ReactNode; label: string; action(): void }[] = [
        {
            icon: (
                <FolderPlusIcon
                    color={colors.text}
                    size={iconSize}
                />
            ),
            label: "Folder",
            action: function (): void {
                throw new Error("Function not implemented.");
            },
        },
        {
            icon: (
                <CloudArrowUpIcon
                    color={colors.text}
                    size={iconSize}
                />
            ),
            label: "Upload",
            action: function (): void {
                throw new Error("Function not implemented.");
            },
        },
        {
            icon: (
                <CameraIcon
                    color={colors.text}
                    size={iconSize}
                />
            ),
            label: "Camera",
            action: function (): void {
                throw new Error("Function not implemented.");
            },
        },
        {
            icon: (
                <DocumentMagnifyingGlassIcon
                    color={colors.text}
                    size={iconSize}
                />
            ),
            label: "Scan",
            action: function (): void {
                throw new Error("Function not implemented.");
            },
        },
        {
            icon: (
                <PhotoIcon
                    color={colors.text}
                    size={iconSize}
                />
            ),
            label: "Photos",
            action: function (): void {
                throw new Error("Function not implemented.");
            },
        },
    ];

    const handlerBottomSheetChange = (index: number) => {
        if (index >= 0) props.onShown();
        else props.onDismiss();
    };

    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
        return (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
            />
        );
    }, []);

    return (
        <BottomSheet
            ref={props.ref}
            index={-1}
            onChange={handlerBottomSheetChange}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            //@ts-ignore
            backgroundClassName="bg-secondary rounded-none"
            handleIndicatorClassName="bg-text"
        >
            <BottomSheetView className="flex flex-row flex-wrap justify-evenly p-2">
                {opts.map((opt, index) => (
                    <View
                        key={index}
                        className="flex flex-col items-center justify-center gap-2 p-2"
                    >
                        {/*@ts-ignore */}
                        <RectButton className="p-3">{opt.icon}</RectButton>
                        <Text variant="label">{opt.label}</Text>
                    </View>
                ))}
            </BottomSheetView>
        </BottomSheet>
    );
}
