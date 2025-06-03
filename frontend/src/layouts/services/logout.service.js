import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/user/auth';

export const logout = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`, {}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}