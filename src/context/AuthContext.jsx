import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
    const [user] = useState("admin");
    const [password] = useState("admin");

    const uriMenus = import.meta.env.URL_MENUS

    const [isLogged, setLogged] = useState(() => {
        const saved = localStorage.getItem("isLogged");
        return saved === "true";
    });

    const login = () => {
        setLogged(true);
        localStorage.setItem("isLogged", "true");
    };

    const logout = () => {
        setLogged(false);
        localStorage.removeItem("isLogged");
    };

    return (
        <AuthContext.Provider value={{ user, password, isLogged, login, logout, uriMenus }}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthContextProvider;