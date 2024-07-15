import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { loginUser, refreshToken } from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [cookies, removeCookie] = useCookies(['access_token', 'refresh_token']);
    const [isAuthenticated, setIsAuthenticated] = useState(!!cookies.access_token);
    const navigate = useNavigate();

    useEffect(() => {
        setIsAuthenticated(!!cookies.access_token);
    }, [cookies.access_token]);

    const login = async (username, password, path='/') => {
        await loginUser(username, password);
        navigate(path);
    };

    const logout = () => {
        removeCookie('access_token');
        removeCookie('refresh_token');
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

    const contextValue = {
        isAuthenticated,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
