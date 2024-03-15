import React, { useState } from 'react'
import ApiServices from '../../services/ApiServices';
import AuthUtils from '../../../utils/AuthUtils';
import { useNavigate,Link } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value })
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await ApiServices.login(formData);
      // console.log(response.user.username,response.user.email);
      if (response && response.token) {
        AuthUtils.setToken(response.token);
        navigate('/profile')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} /><br />
        <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} /><br />
        <button type='submit'>Login</button>
      </form>
      <Link to='/signup'>signup here</Link>
    </>
  )
}

export default Login