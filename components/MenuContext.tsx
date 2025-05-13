import React, { createContext, useContext } from "react";

interface MenuContextType {
    closeMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = (): MenuContextType => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenu must be used within a MenuProvider");
    }
    return context;
};

interface MenuProviderProps {
    children: React.ReactNode;
    closeMenu: () => void;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({
    children,
    closeMenu,
}) => {
    return (
        <MenuContext.Provider value={{ closeMenu }}>
            {children}
        </MenuContext.Provider>
    );
};
