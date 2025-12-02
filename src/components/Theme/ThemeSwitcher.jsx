import React from 'react'
import { assets } from '../../assets/assets';

const ThemeSwitcher = ({ theme, setTheme }) => {

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <img src={theme == 'light' ? assets.darkmode : assets.lightmode} alt="Trocar tema" onClick={toggleTheme} />
    );
}

export default ThemeSwitcher;