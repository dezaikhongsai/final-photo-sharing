import { createComment } from '../services/comment.service.js';

export const createCommentController = async (req, res) => {
    try {
        const { comment, photoId , userId } = req.body;
        
        // Validate required fields
        if (!comment || !photoId) {
            return res.status(400).json({
                success: false,
                message: "Comment text and photoId are required"
            });
        }

        const commentData = {
            comment,
            photoId,
            userId, // From verifyToken middleware
        };

        const newComment = await createComment(commentData);

        res.status(201).json({
            success: true,
            message: "Comment created successfully",
            data: {
                comment: newComment
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}; 