import Comment from "../models/comment.model.js";
import Photo from "../models/photo.model.js";
import path from "path";
import fs from "fs/promises";
import mongoose from "mongoose";

export const getPhotosByUserId = async (userId) => {
  try {
    const photos = await Photo.find({ userId });

    const photosWithComments = await Promise.all(
      photos.map(async (photo) => {
        const comments = await Comment.find({ photoId: photo._id })
          .populate("userId", "username first_name last_name")
          .sort({ day: -1 });

        return {
          ...photo.toObject(),
          comments: comments,
        };
      })
    );

    return photosWithComments;
  } catch (error) {
    throw new Error("Error fetching photos with comments: " + error.message);
  }
};

export const createPhoto = async (photoData) => {
  try {
    const { file_name, userId } = photoData;

    const newPhoto = await Photo.create({
      file_name,
      userId,
    });

    return newPhoto;
  } catch (error) {
    throw new Error("Error creating photo: " + error.message);
  }
};

export const deletePhoto = async (pId) => {
  if (!mongoose.Types.ObjectId.isValid(pId)) {
    throw new Error("Invalid photo ID");
  }

  try {
    const deletedPhoto = await Photo.findByIdAndDelete(pId);
    if (!deletedPhoto) {
      throw new Error("Photo not found");
    }
    const filePath = path.join(
      __dirname,
      "upload",
      path.basename(deletedPhoto.imageUrl)
    );
    await fs.unlink(filePath).catch((err) => {
      console.error("Error deleting file:", err);
    });

    // Delete related comments
    await Comment.deleteMany({ photoId: pId });

    return deletedPhoto;
  } catch (error) {
    console.error("Error deleting photo:", error);
    throw new Error("Error deleting photo: " + error.message);
  }
};
