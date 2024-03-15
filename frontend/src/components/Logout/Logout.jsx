import React from 'react'
import AuthUtils from '../../../utils/AuthUtils.js'
import ApiServices from '../../services/ApiServices.js'
const Logout = () => {
    const handleLogoutClick = async ({ handleLogout }) => {
        AuthUtils.removeToken();
        try {
            await ApiServices.logout();

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <button onClick={handleLogoutClick}>Logout</button>
    )
}

export default Logout