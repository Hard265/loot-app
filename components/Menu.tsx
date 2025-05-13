import React, { PropsWithChildren } from "react";
import { View } from "react-native";
import { MenuProvider } from "./MenuContext";

interface MenuProps {
    onRequestDismiss():void;
}

const Menu: React.FC<PropsWithChildren<MenuProps>> = ({children, onRequestDismiss}) => {
    return    <MenuProvider closeMenu={onRequestDismiss}><View className="shadow border">
        {children}
    </View>
        </MenuProvider>
}

Menu.displayName = "Menu";

export default Menu;