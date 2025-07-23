import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { FaMoon, FaSun } from "react-icons/fa6";

import {
    Container
} from './styles'

const Themes: React.FC[] = [FaSun, FaMoon]

interface IThemeChanger {
    theme: boolean;
}

const ThemeChanger: React.FC<IThemeChanger> = () => {
    const {themeIcon} = useTheme();

    return (
        <Container>
            {
                React.createElement(Themes[themeIcon])
            }
        </Container>
    );
}

export default ThemeChanger;