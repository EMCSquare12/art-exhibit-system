import { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosConfig';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('ticketSiteToken') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const res = await axiosInstance.get('/api/users/me');
                    setUser(res.data);
                } catch (error) {
                    console.error("Token invalid or expired:", error);
                    logout(); 
                }
            }
            setLoading(false);
        };

        loadUser();
    }, [token]); 


    const register = async (userData) => {
        const res = await axiosInstance.post('/api/users/register', userData);
        localStorage.setItem('ticketSiteToken', res.data.token);
        setToken(res.data.token);
        setUser(res.data);
        return res.data;
    };

    const login = async (email, password) => {
        const res = await axiosInstance.post('/api/users/login', { email, password });
        localStorage.setItem('ticketSiteToken', res.data.token);
        setToken(res.data.token);
        setUser(res.data);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('ticketSiteToken');
        setToken(null);
        setUser(null);
    };


    const value = {
        user,
        token,
        loading,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};