import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/photo';
const API_COMMENT = import.meta.env.VITE_API_URL + '/comment'
export const getPhotosByUserId = async (userId ) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching photos:', error);
        throw error;
    }
}

export const addComment = async (commentData) => {
  try {
    const response = await axios.post(
      API_COMMENT, // API_COMMENT nếu có
      commentData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
