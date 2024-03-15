import React, { useState } from 'react'
import ApiServices from '../../services/ApiServices'
const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    });
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value)
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await ApiServices.signup(formData);
            console.log('signup success!', response)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} /><br />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} /><br />
                <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} /><br />
                <button type='submit'>Signup</button>
            </form>

        </>
    )
}

export default Signup