import { createContext, PropsWithChildren, useContext } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Text from "./Text";

cssInterop(RectButton, { className: "style" });

const MenuContext = createContext<{
    onSelect(value: any): void;
}>({
    onSelect: () => {
        throw new Error("Function not implemented.");
    },
});

interface MenuItem {
    value: unknown;
    label: string;
    icon?: React.ReactNode;
}

interface MenuProps {
    items: MenuItem[];
    onSelect(value: unknown): void;
    title?: string;
}

export function useMenu() {
    const context = useContext(MenuContext);
    return context;
}

export default function Menu(props: PropsWithChildren<MenuProps>) {
    const { items, onSelect, title } = props;

    return (
        <MenuContext.Provider value={{ onSelect }}>
            <View>
                {title && <Text variant="title3">{title}</Text>}
                <View className="flex flex-col">
                    {items.map((item, idx) => (
                        <MenuItemComponent
                            key={idx}
                            item={item}
                        />
                    ))}
                </View>
            </View>
        </MenuContext.Provider>
    );
}

const MenuItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => {
    const { onSelect } = useMenu();

    return (
        <RectButton
            className="flex flex-row items-center gap-4 p-2"
            onTouchEnd={() => onSelect(item.value)}
        >
            {item.icon}
            <Text variant="label">{item.label}</Text>
        </RectButton>
    );
};
