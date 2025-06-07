import {
  getPhotosByUserId,
  createPhoto,
  deletePhoto,
} from "../services/photo.service.js";
import mongoose from "mongoose";

export const getUserPhotosController = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required",
      });
    }

    const photosWithComments = await getPhotosByUserId(userId);

    res.status(200).json({
      success: true,
      message: "Photos and comments retrieved successfully",
      data: {
        photos: photosWithComments,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const uploadPhotoController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const photoData = {
      file_name: req.file.filename,
      userId: req.user.userId, // This comes from the verifyToken middleware
    };

    const newPhoto = await createPhoto(photoData);

    res.status(201).json({
      success: true,
      message: "Photo uploaded successfully",
      data: {
        photo: newPhoto,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePhotoController = async (req, res) => {
  const { pId } = req.params;
  try {
    const result = await deletePhoto(pId);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error deleting photo:", err);
    if (
      err.message === "Photo not found." ||
      err.message === "Unauthorized to delete this photo."
    ) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};
