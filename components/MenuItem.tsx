import { Text } from "react-native";
import { useMenu } from "./MenuContext";
import { cssInterop } from "nativewind";
import { RectButton } from "react-native-gesture-handler";

cssInterop(RectButton, { className: "style" });

interface MenuItemProps {
    title: string;
    onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, onPress }) => {
    const { closeMenu } = useMenu();

    const handlePress = () => {
        onPress();
        closeMenu();
    };

    return (
        <RectButton
            className="py-2 border-b border-gray-300 last:border-b-0"
            onPress={handlePress}
        >
            <Text className="text-lg text-gray-800">{title}</Text>
        </RectButton>
    );
};

export default MenuItem;
