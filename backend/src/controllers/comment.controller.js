import {
  createComment,
  updateComment,
  deleteComment,
} from "../services/comment.service.js";

export const createCommentController = async (req, res) => {
  try {
    const { comment, photoId, userId } = req.body;

    // Validate required fields
    if (!comment || !photoId) {
      return res.status(400).json({
        success: false,
        message: "Comment text and photoId are required",
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
        comment: newComment,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCommentController = async (req, res) => {
  try {
    const { cId } = req.params;
    const { comment, userId, photoId } = req.body;
    const newComment = await updateComment(cId, {
      comment,
      userId,
      photoId,
    });
    res.status(200).json({
      success: true,
      message: "Update success",
      data: newComment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCommentController = async (req, res) => {
  try {
    const { cId } = req.params;
    const del = await deleteComment(cId);
    res.status(200).json({
      success: true,
      message: "deleted Comment",
      data: del,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
