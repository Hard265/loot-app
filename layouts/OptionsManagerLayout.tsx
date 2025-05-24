import AlertDialog from "@/components/AlertDialog";
import ListItem from "@/components/ListItem";
import Text from "@/components/Text";
import useBackHandler from "@/hooks/useBackHandler";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { cssInterop } from "nativewind";
import {
    FC,
    PropsWithChildren,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { View } from "react-native";
import { BehaviorSubject } from "rxjs";

export interface Option<T = unknown> {
    label: string;
    icon?: ReactNode;
    value: T;
}

interface OptionsConfig {
    title?: string;
    subtitle?: string;
}

cssInterop(BottomSheet, {
    className: "backgroundStyle",
    handleIndicatorClassName: "handleIndicatorStyle",
});

const optionsSubject = new BehaviorSubject<{
    items: Option[];
    config?: OptionsConfig;
} | null>(null);
let optionsResolver: (<T = any>(value: T) => void) | null = null;

export function showOptions<T>(
    items: Option<T>[],
    config?: OptionsConfig,
): Promise<T | null> {
    return new Promise((resolve) => {
        //@ts-ignore
        optionsResolver = resolve;
        optionsSubject.next({ items, config });
    });
}

export const hideOptions = () => {
    if (optionsResolver) optionsResolver(null);
    optionsSubject.next(null);
};

type AlertAction = { text: string };
type AlertConfig = { title: string; message: string; actions: AlertAction[] };

const alertSubject = new BehaviorSubject<AlertConfig | null>(null);
let alertResolver: ((value: number | null) => void) | null = null;

export function alert(config: AlertConfig): Promise<number | null> {
    return new Promise((resolve) => {
        alertResolver = resolve;
        alertSubject.next(config);
    });
}

const OptionsManagerLayout: FC<PropsWithChildren> = ({ children }) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [dialogData, setDialogData] = useState<{
        items: Option[];
        config?: OptionsConfig;
    } | null>(null);
    const [alertData, setAlertData] = useState<AlertConfig | null>(null);
    const [alertVisible, setAlertVisible] = useState(false);

    useBackHandler(isVisible, () => {
        hideOptions();
    });

    useEffect(() => {
        const subscription = optionsSubject.subscribe(setDialogData);
        const alertSub = alertSubject.subscribe((data) => {
            setAlertData(data);
            setAlertVisible(!!data);
        });
        return () => {
            subscription.unsubscribe();
            alertSub.unsubscribe();
        };
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

    const handleAlertAction = (idx: number | null) => {
        setAlertVisible(false);
        setTimeout(() => {
            alertSubject.next(null);
            if (alertResolver) alertResolver(idx);
        }, 0);
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
                //@ts-ignore
                className="rounded-none bg-secondary"
                handleIndicatorClassName="bg-text"
            >
                <BottomSheetView>
                    {dialogData?.config?.title && (
                        <View className="flex flex-col items-start p-4 pt-0.5">
                            <Text
                                variant="largeTitle"
                                singleLine
                            >
                                {dialogData.config.title}
                            </Text>
                            {dialogData.config.subtitle && (
                                <Text>{dialogData.config.subtitle}</Text>
                            )}
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
            <AlertDialog
                alertVisible={alertVisible}
                handleAlertAction={handleAlertAction}
                alertData={alertData}
            />
        </>
    );
};

export default OptionsManagerLayout;
