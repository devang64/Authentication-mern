import { createContext, useContext, useEffect, useState } from "react";
import ApiServices from "../services/ApiServices";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        const getUser = async () => {
            try {
                const result = await ApiServices.userProfile()
                setUser(result.user);
            } catch (error) {
                console.log('error: ', error);
            }
        }
        if (token) {
            getUser()
            navigate('/profile')
        } else {
            navigate('/login');
        }
    }, [])


    const login = async (email, password) => {
        try {
            const data = await ApiServices.login({ email, password });
            setUser(data.user);
            localStorage.setItem('token', data.token);
            navigate('/profile')
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const signup = async (email, password) => {
        try {
            const data = await ApiServices.signup({ email, password });
            setUser(data.user);
            localStorage.setItem('token', data.token);
            navigate('/profile')
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    const logout = async () => {
        try {
            await ApiServices.logout();
            setUser(null);
            localStorage.removeItem('token');
            navigate('/login')
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return (
        <AuthContext.Provider value={{ login, signup, logout, user }}>
            {children}
        </AuthContext.Provider>
    )
}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export const useAuth = () => {
    return useContext(AuthContext);
}