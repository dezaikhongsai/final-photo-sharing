import express from 'express';
import { getUserPhotosController, uploadPhotoController } from '../controllers/photo.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

// Get user's photos with comments
router.get('/user/:userId', verifyToken, getUserPhotosController);

// Upload new photo
router.post('/upload', verifyToken, upload.single('photo'), uploadPhotoController);

export default router;
