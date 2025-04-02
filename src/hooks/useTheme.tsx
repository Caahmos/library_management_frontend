import React, { createContext, useState, useContext } from "react";

import dark from "../styles/themes/dark"
import light from "../styles/themes/light";

interface IThemeContext {
    changeTheme(): void;
    theme: ITheme;
    themeIcon: number;
}

interface ITheme {
    title: string;
    colors: {
        primary: string;
        secondary: string;
        tertiary: string;

        white: string;
        black: string;
        gray: string;

        success: string;
        info: string;
        warning: string;
    },
}

const Context = createContext({} as IThemeContext);

interface IThemeProviderProps {
    children: React.ReactNode;
}

const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
    const [themeIcon, setThemeIcon] = useState(() => {
        const savedTheme = localStorage.getItem('@library_management:theme');

        if (savedTheme) {
            const selectedTheme = JSON.parse(savedTheme);
            return selectedTheme.title === 'light' ? 0 : 1;
        } else {
            return 0;
        }});
    const [theme, setTheme] = useState<ITheme>(() => {
        const savedTheme = localStorage.getItem('@library_management:theme');

        if (savedTheme) {
            return JSON.parse(savedTheme);
        } else {
            localStorage.setItem('@library_management:theme', JSON.stringify(light));
            return light;
        }
    });

    const changeTheme = () => {
        if (theme.title === 'dark') {
            console.log('Light');
            setTheme(light);
            setThemeIcon(0);
            localStorage.setItem('@library_management:theme', JSON.stringify(light));
        } else {
            console.log('Dark');
            setTheme(dark);
            setThemeIcon(1);
            localStorage.setItem('@library_management:theme', JSON.stringify(dark));
        };
    };

    return (
        <Context.Provider value={{ theme, changeTheme, themeIcon }}>
            {children}
        </Context.Provider>
    )
}

const useTheme = (): IThemeContext => {
    const context = useContext(Context);
    return context;
}

export { ThemeProvider, useTheme };