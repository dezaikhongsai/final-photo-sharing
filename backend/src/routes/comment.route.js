import express from 'express';
import { createCommentController } from '../controllers/comment.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Create new comment
router.post('/', verifyToken, createCommentController);

export default router; 