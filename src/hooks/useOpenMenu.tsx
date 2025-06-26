import React, { useState, createContext, useContext } from "react";

interface IMenuBoolean {
    isOpenMenu: boolean;
    open(): boolean
}

const MenuContext = createContext<IMenuBoolean>({} as IMenuBoolean);

interface IMenuProps {
    children: React.ReactNode;
}

const MenuProvider: React.FC<IMenuProps> = ({ children }) => {
    const [isOpenMenu, setisOpenMenu] = useState(false);

    const open = () => {
        setisOpenMenu(!isOpenMenu);
        return isOpenMenu;
    };

    return (
        <MenuContext.Provider value={{ open, isOpenMenu }}>
            {children}
        </MenuContext.Provider>
    )
}

const useMenu = () => {
    const context = useContext(MenuContext);

    return context;
};

export {MenuProvider, useMenu};