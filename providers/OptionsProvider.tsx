import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
    PropsWithChildren,
    useCallback,
    useMemo,
    useRef,
    useState,
} from "react";
import { View } from "react-native";
import type {
    Option,
    OptionsConfig,
    OptionsContextType,
} from "@/contexts/OptionsContext";
import OptionsContext from "@/contexts/OptionsContext";
import ListItem from "@/components/ListItem";
import { cssInterop } from "nativewind";
import Text from "@/components/Text";

cssInterop(BottomSheet, {
    className: "backgroundStyle",
    indicatorClassName: "handleIndicatorStyle",
});

export default function OptionsProvider({ children }: PropsWithChildren) {
    const [resolver, setResolver] = useState<
        (<T = unknown>(value?: T) => void) | null
    >(null);
    const sheetRef = useRef<BottomSheet>(null);
    const [options, setOptions] = useState<Option[] | null>(null);
    const [config, setConfig] = useState<OptionsConfig | null>(null);

    const context: OptionsContextType = useMemo(
        () => ({
            async showOptions(opts, userConfig) {
                sheetRef.current?.expand();
                return new Promise((resolve) => {
                    setOptions(opts);
                    setConfig(userConfig ?? null);
                    setResolver(() => resolve);
                });
            },
        }),
        [],
    );

    const handleClose = useCallback(() => {
        sheetRef.current?.close();
        setOptions(null);
        setConfig(null);
        resolver?.();
        setResolver(null);
    }, [resolver]);

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                onPress={handleClose}
            />
        ),
        [handleClose],
    );

    const handleSelect = useCallback(
        (value: Option["value"]) => {
            resolver?.(value);
            if (config?.dismissOnSelect !== false) {
                handleClose();
            }
        },
        [resolver, config?.dismissOnSelect, handleClose],
    );

    const renderedOptions = useMemo(
        () =>
            options?.map((option, index) => (
                <ListItem
                    key={index}
                    title={option.label}
                    onTap={() => handleSelect(option.value)}
                />
            )) ?? null,
        [options, handleSelect],
    );

    return (
        <OptionsContext.Provider value={context}>
            {children}
            <BottomSheet
                ref={sheetRef}
                backdropComponent={renderBackdrop}
                index={-1}
                enablePanDownToClose
                onClose={handleClose}
                className="rounded-none bg-secondary"
                indicatorClassName="bg-text"
            >
                <BottomSheetView className="p-4">
                    {config?.title && (
                        <View className="p-4">
                            <Text variant="title2">{config.title}</Text>
                        </View>
                    )}
                    <View>{renderedOptions}</View>
                </BottomSheetView>
            </BottomSheet>
        </OptionsContext.Provider>
    );
}
