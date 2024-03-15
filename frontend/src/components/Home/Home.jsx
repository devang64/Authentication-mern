import React, { useEffect, useState } from 'react'
import AuthUtils from '../../../utils/AuthUtils';
import Logout from '../Logout/Logout';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import { Navigate, useNavigate } from 'react-router-dom';
import ApiServices from '../../services/ApiServices';

const Home = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogout = () => {
        AuthUtils.removeToken();
        setIsLoggedIn(false)
    }
    const checkUser = () => {
        if (!AuthUtils.isUserLoggedin()) {
            navigate('/login');
        } else { setIsLoggedIn(true); }
    }
    useEffect(() => {
        checkUser()
    })

    return (
        <>
            {isLoggedIn ? <Logout handleLogout={handleLogout} /> : <>
                <Login />
                <Signup />
            </>}
        </>
    )
}

export default Home