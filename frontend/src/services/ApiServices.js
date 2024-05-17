import axios from 'axios';


class ApiServices {
    static signup = async (data) => {
        const url = `http://localhost:4000/api/signup`;
        const response = await axios.post(url, data);
        return response.data;
    }
    static login = async (data) => {
        const url = `http://localhost:4000/api/login`;
        const response = await axios.post(url, data)
        return response.data;
    }
    static logout = async () => {
        const url = `http://localhost:4000/api/logout`;
        const response = await axios.get(url)
        return response.data;
    }
    static userProfile = async () => {
        const url = `http://localhost:4000/api/profile`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return response.data;
    }

}

export default ApiServices;