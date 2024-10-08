import Comment from '../models/Comment.js';

export const addComment = async (req, res) => {
  const { postId } = req.params;
  const { commentText, author } = req.body;

  const comment = new Comment({ commentText, author, post: postId });
  await comment.save();

  res.status(201).json({ message: 'Comment added successfully', comment: { postId, commentText, author } });
};

export const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { commentText } = req.body;

  await Comment.findByIdAndUpdate(commentId, { commentText });

  res.status(200).json({ message: 'Comment updated successfully', commentId });
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  await Comment.findByIdAndDelete(commentId);

  res.status(200).json({ message: 'Comment deleted successfully', commentId });
};
