import BottomSheet from "@gorhom/bottom-sheet";
import {
    Modal,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Pressable,
} from "react-native";
import Text from "./Text";

type AlertAction = { text: string };
type AlertConfig = { title: string; message: string; actions: AlertAction[] };

type AlertDialogProps = {
    alertVisible: boolean;
    handleAlertAction: (idx: number | null) => void;
    alertData: AlertConfig | null;
};

const AlertDialog: React.FC<AlertDialogProps> = ({
    alertVisible,
    handleAlertAction,
    alertData,
}) => {
    const dismissAlert = () => handleAlertAction(null);
    return (
        <BottomSheet>
            <Modal
                visible={alertVisible}
                transparent
                animationType="fade"
                statusBarTranslucent
                navigationBarTranslucent
                onDismiss={dismissAlert}
                onRequestClose={dismissAlert}
            >
                <Pressable
                    onPress={dismissAlert}
                    className="flex-1 items-center justify-center bg-black/40 p-4"
                >
                    <View className="flex min-w-72 flex-col rounded-sm border border-neutral-50 bg-secondary shadow-sm shadow-text dark:border-neutral-700">
                        <View className="p-6 pb-4">
                            <Text variant="title2">{alertData?.title}</Text>
                        </View>
                        <View className="px-6 pb-1">
                            <Text>{alertData?.message}</Text>
                        </View>
                        <View className="flex-row justify-end gap-4 px-4 py-0.5">
                            {alertData?.actions.map((action, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    onPress={() => handleAlertAction(idx)}
                                    className={"p-2.5"}
                                >
                                    <Text variant="label">{action.text}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </BottomSheet>
    );
};

export default AlertDialog;
