import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { loginUser, refreshToken } from '../api/api';
import { COOKIE_NAMES } from '../config/Constants';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
    const [cookies, removeCookie] = useCookies([COOKIE_NAMES.ACCESS_TOKEN, COOKIE_NAMES.REFRESH_TOKEN]);
    const [isAuthenticated, setIsAuthenticated] = useState(!!cookies.access_token);
    const navigate = useNavigate();

    useEffect(() => {
        setIsAuthenticated(!!cookies.access_token);
    }, [cookies.access_token]);

    const login = async (username, password, path = '/') => {
        await loginUser(username, password);
        navigate(path);
    };

    const logout = () => {
        removeCookie(COOKIE_NAMES.ACCESS_TOKEN);
        removeCookie(COOKIE_NAMES.REFRESH_TOKEN);
        navigate('/');
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (cookies.refresh_token) {
                refreshToken();
            }
        }, 1000 * 60 * 4); // 4 minutes
        return () => clearInterval(interval);
    }, [cookies.refresh_token]);

    const contextValue = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated, login, logout]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
