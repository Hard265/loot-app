import { Text } from "react-native";
import { cssInterop } from "nativewind";
import { RectButton } from "react-native-gesture-handler";
import { PropsWithChildren, ReactNode } from "react";
import { useMenu } from "./Menu";

cssInterop(RectButton, { className: "style" });

interface MenuItemProps {
    value: any;
    icon: ReactNode;
}

const MenuItem: React.FC<PropsWithChildren<MenuItemProps>> = ({
    children,
    value,
    icon,
}) => {
    const { onSelect } = useMenu();

    return (
        <RectButton
            className="flex flex-row items-center gap-4 border-b border-gray-300 p-2 last:border-b-0"
            onPress={() => onSelect(value)}
        >
            {icon}
            <Text className="text-lg text-text">{children}</Text>
        </RectButton>
    );
};

export default MenuItem;
