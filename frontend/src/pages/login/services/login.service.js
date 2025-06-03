import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/user/auth';
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const { data } = response;
        console.log('Response data:', data);

        // Kiểm tra response format
        if (!data.success || !data.data) {
            throw new Error(data.message || 'Login failed');
        }

        const userData = data.data;

        // Kiểm tra user data và token
        if (!userData.user || !userData.accessToken) {
            throw new Error('Invalid response format from server');
        }

        // Format lại data theo cấu trúc mong muốn
        return {
            token: userData.accessToken,
            user: {
                id: userData.user._id,
                username: userData.user.username,
                firstName: userData.user.first_name,
                lastName: userData.user.last_name,
                location: userData.user.location,
                description: userData.user.description,
                occupation: userData.user.occupation
            }
        };
    } catch (error) {
        console.error('Login error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
}

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register` , userData , {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}