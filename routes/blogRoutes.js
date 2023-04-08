const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// GET /api/blogs - Get all blogs
router.get('/', blogController.getAllBlogs);

// GET /api/blogs/:blogId - Get a blog by id
router.get('/:blogId', blogController.getBlogById);

// POST /api/blogs - Create a new blog
router.post('/', blogController.createBlog);

// PUT /api/blogs/:blogId - Update a blog by id
router.put('/:blogId', blogController.updateBlog);

// DELETE /api/blogs/:blogId - Delete a blog by id
router.delete('/:blogId', blogController.deleteBlog);

module.exports = router;
