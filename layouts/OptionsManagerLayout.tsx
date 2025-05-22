import {
    FC,
    PropsWithChildren,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { BehaviorSubject } from "rxjs";
import { View } from "react-native";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import useBackHandler from "@/hooks/useBackHandler";
import ListItem from "@/components/ListItem";
import Text from "@/components/Text";
import { cssInterop } from "nativewind";

interface Option<T = unknown> {
    label: string;
    icon?: ReactNode;
    value: T;
}

interface OptionsConfig {
    title?: string;
}

cssInterop(BottomSheet, {
    className: "backgroundStyle",
    handleIndicatorClassName: "handleIndicatorStyle",
});

const optionsSubject = new BehaviorSubject<{
    items: Option[];
    config?: OptionsConfig;
} | null>(null);
let optionsResolver: ((value: unknown) => void) | null = null;

export const showOptions = (items: Option[], config?: OptionsConfig) => {
    return new Promise((resolve) => {
        optionsResolver = resolve;
        optionsSubject.next({ items, config });
    });
};

export const hideOptions = () => {
    if (optionsResolver) optionsResolver(null);
    optionsSubject.next(null);
};

const OptionsManagerLayout: FC<PropsWithChildren> = ({ children }) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [dialogData, setDialogData] = useState<{
        items: Option[];
        config?: OptionsConfig;
    } | null>(null);

    useBackHandler(isVisible, () => {
        hideOptions();
    });

    useEffect(() => {
        const subscription = optionsSubject.subscribe(setDialogData);
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (dialogData !== null) bottomSheetRef.current?.expand();
        else bottomSheetRef.current?.close();
    }, [dialogData]);

    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
        return (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
            />
        );
    }, []);

    const handleOnBottomSheetChange = (index: number) => {
        setIsVisible(index >= 0);
    };

    const handleSelection = (value: Option["value"]) => {
        if (optionsResolver) optionsResolver(value);
        hideOptions();
    };

    return (
        <>
            {children}
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                onClose={hideOptions}
                onChange={handleOnBottomSheetChange}
                className="rounded-none bg-secondary"
                handleIndicatorClassName="bg-text"
            >
                <BottomSheetView>
                    {dialogData?.config?.title && (
                        <View>
                            <Text variant="title2">
                                {dialogData.config.title}
                            </Text>
                        </View>
                    )}
                    <View>
                        {dialogData?.items.map((item, index) => (
                            <ListItem
                                title={item.label}
                                icon={item.icon}
                                key={`${index}-item`}
                                onTap={() => handleSelection(item.value)}
                            />
                        ))}
                    </View>
                    <Text />
                </BottomSheetView>
            </BottomSheet>
        </>
    );
};

export default OptionsManagerLayout;
