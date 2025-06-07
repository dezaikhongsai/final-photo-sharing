import express from "express";
import {
  createCommentController,
  updateCommentController,
  deleteCommentController,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create new comment
router.post("/", verifyToken, createCommentController);
router.put("/:cId", verifyToken, updateCommentController);
router.delete("/:cId", verifyToken, deleteCommentController);

export default router;
