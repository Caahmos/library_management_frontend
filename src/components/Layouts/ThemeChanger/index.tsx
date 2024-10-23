import React from 'react';
import { useState } from 'react';

import { FaMoon, FaSun } from "react-icons/fa6";

import {
    Container
} from './styles'

const Themes: React.FC[] = [FaSun, FaMoon]

interface IThemeChanger {
    theme: boolean;
}

const ThemeChanger: React.FC<IThemeChanger> = ({ theme }) => {
    const [selectedTheme, setSelectedTheme] = useState(() => theme ? 1 : 0)

    function handleThemeSelected() {
        if (selectedTheme === 0) {
            setSelectedTheme(1)
        } else {
            setSelectedTheme(0)
        }
    }

    return (
        <Container onClick={handleThemeSelected}>
            {
                React.createElement(Themes[selectedTheme])
            }
        </Container>
    );
}

export default ThemeChanger;