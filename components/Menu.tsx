import { createContext, PropsWithChildren, useContext } from "react";
import { View } from "react-native";
import Text from "./Text";

const MenuContext = createContext<{ onSelect(value: any): void }>({
    onSelect: function (value: any): void {
        throw new Error("Function not implemented.");
    },
});

interface MenuProps {
    onSelect(value: unknown): void;
    title?: string;
}

export function useMenu() {
    const context = useContext(MenuContext);
    return context;
}

export default function Menu(props: PropsWithChildren<MenuProps>) {
    return (
        <MenuContext.Provider value={{ onSelect: props.onSelect }}>
            {props.title && <Text variant="title3">{props.title}</Text>}
            <View className="flex flex-col pb-4">{props.children}</View>
        </MenuContext.Provider>
    );
}
