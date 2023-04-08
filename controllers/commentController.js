const Comment = require('../models/comment');

// Get all comments
const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

// Get a comment by id
const getCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

// Create a new comment
const createComment = async (req, res, next) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
};

// Update a comment by id
const updateComment = async (req, res, next) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedComment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

// Delete a comment by id
const deleteComment = async (req, res, next) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!deletedComment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }
    res.status(200).json(deletedComment);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
};
