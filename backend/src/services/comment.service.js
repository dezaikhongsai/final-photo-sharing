import Comment from "../models/comment.model.js";

export const createComment = async (commentData) => {
  try {
    const { comment, userId, photoId } = commentData;

    const newComment = await Comment.create({
      comment,
      userId,
      photoId,
    });

    // Populate user information
    const populatedComment = await newComment.populate(
      "userId",
      "username first_name last_name"
    );

    return populatedComment;
  } catch (error) {
    throw new Error("Error creating comment: " + error.message);
  }
};

export const updateComment = async (cId, commentData) => {
  const { comment, userId, photoId } = commentData;
  const updatedComment = await Comment.findByIdAndUpdate(
    cId,
    {
      comment,
      userId,
      photoId,
    },
    { new: true }
  );
  if (!updatedComment) throw Error("Faild to updated");
  return updatedComment;
};

export const deleteComment = async (cId) => {
  const del = await Comment.findByIdAndDelete(cId);
  if (!del) {
    throw new Error("Failed to delete");
  }
  return del;
};
