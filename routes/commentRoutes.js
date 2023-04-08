const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// GET /api/comments - Get all comments
router.get('/', commentController.getAllComments);

// GET /api/comments/:commentId - Get a comment by id
router.get('/:commentId', commentController.getCommentById);

// POST /api/comments - Create a new comment
router.post('/', commentController.createComment);

// PUT /api/comments/:commentId - Update a comment by id
router.put('/:commentId', commentController.updateComment);

// DELETE /api/comments/:commentId - Delete a comment by id
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
