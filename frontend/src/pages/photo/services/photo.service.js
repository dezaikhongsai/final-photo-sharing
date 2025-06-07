import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/photo";
const API_COMMENT = import.meta.env.VITE_API_URL + "/comment";
export const getPhotosByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};

export const addComment = async (commentData) => {
  try {
    const response = await axios.post(
      API_COMMENT, // API_COMMENT nếu có
      commentData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateComment = async (cId, commentData) => {
  try {
    const response = await axios.put(`${API_COMMENT}/${cId}`, commentData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (cId) => {
  try {
    const response = await axios.delete(`${API_COMMENT}/${cId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePhoto = async (pId) => {
  try {
    console.log("Gửi request xóa với ID:", pId);
    const response = await axios.delete(`${API_URL}/${pId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("Phản hồi xóa:", response.data);
    if (!response.data.success) {
      throw new Error(response.data.message || "Delete failed");
    }
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API xóa:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};
