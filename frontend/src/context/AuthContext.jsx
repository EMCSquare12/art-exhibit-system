import { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosConfig';

// 1. Create the context
const AuthContext = createContext();

// Custom hook to easily use this context in other components
export const useAuth = () => useContext(AuthContext);

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // Check localStorage immediately for existing token
    const [token, setToken] = useState(localStorage.getItem('ticketSiteToken') || null);
    const [loading, setLoading] = useState(true);

    // --- Initial Load Check ---
    useEffect(() => {
        // If a token exists on load, try to fetch user details to validate it
        const loadUser = async () => {
            if (token) {
                try {
                    // The axios interceptor will automatically attach the token here
                    const res = await axiosInstance.get('/users/me');
                    setUser(res.data);
                } catch (error) {
                    console.error("Token invalid or expired:", error);
                    logout(); // Clear invalid data
                }
            }
            setLoading(false);
        };

        loadUser();
    }, [token]); // Run whenever token changes (e.g. on mount or after login)


    // --- Auth Actions ---

    // Register Function
    const register = async (userData) => {
        const res = await axiosInstance.post('/users', userData);
        // On success, save data
        localStorage.setItem('ticketSiteToken', res.data.token);
        setToken(res.data.token);
        setUser(res.data);
        return res.data;
    };

    // Login Function
    const login = async (email, password) => {
        const res = await axiosInstance.post('/users/login', { email, password });
        // On success, save data to localStorage and state
        localStorage.setItem('ticketSiteToken', res.data.token);
        setToken(res.data.token);
        setUser(res.data);
        return res.data;
    };

    // Logout Function
    const logout = () => {
        localStorage.removeItem('ticketSiteToken');
        setToken(null);
        setUser(null);
    };


    // Data to expose to the rest of the app
    const value = {
        user,
        token,
        loading,
        register,
        login,
        logout
    };

    // 3. Wrap children with provider
    // Don't render the app until initial loading check is done
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};