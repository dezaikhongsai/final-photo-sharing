import express from "express";
import {
  getUserPhotosController,
  uploadPhotoController,
  deletePhotoController,
} from "../controllers/photo.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { deleteCommentController } from "../controllers/comment.controller.js";

const router = express.Router();
router.get("/user/:userId", verifyToken, getUserPhotosController);
router.post(
  "/upload",
  verifyToken,
  upload.single("photo"),
  uploadPhotoController
);
router.delete("/:pId", verifyToken, deletePhotoController);

export default router;
