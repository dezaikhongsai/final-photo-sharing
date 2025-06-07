import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "/user";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUserById = async (uId) => {
  try {
    const response = await axiosInstance.get(`/${uId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
