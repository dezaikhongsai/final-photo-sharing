import Comment from '../models/comment.model.js';

export const createComment = async (commentData) => {
    try {
        const { comment, userId, photoId } = commentData;
        
        const newComment = await Comment.create({
            comment,
            userId,
            photoId
        });

        // Populate user information
        const populatedComment = await newComment.populate('userId', 'username first_name last_name');
        
        return populatedComment;
    } catch (error) {
        throw new Error('Error creating comment: ' + error.message);
    }
}; 