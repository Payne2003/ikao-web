import { getUserFromToken, login, logout } from "@/services/authService";
import  { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = getUserFromToken();
        setUser(userData);
    }, []);

    const handleLogin = async (credentials) => {
        const res = await login(credentials);
        if (res) setUser(getUserFromToken());
    };

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
