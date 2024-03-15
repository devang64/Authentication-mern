import React, { useEffect, useState } from 'react'
import ApiServices from '../../services/ApiServices';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const fetchProfile = async () => {
        const response = await ApiServices.userProfile();
        setUserData(response)
    }
    useEffect(() => {

        fetchProfile();
    }, []);
    return (
        <div>{userData ? (
            <>
            <h3>Email : {userData.email}</h3>
            <h3>User Name : {userData.username}</h3>
            <h3>Password : {userData.password}</h3>
            </>
        )

            : <Link to="/login">Login here</Link>}</div>
    )
}

export default Profile