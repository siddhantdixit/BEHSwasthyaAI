const Blog = require('../models/blog');

// Get all blogs
const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

// Get a blog by id
const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
      return res.status(404).json({
        message: 'Blog not found'
      });
    }
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

// Create a new blog
const createBlog = async (req, res, next) => {
  try {
    // req.body.author = req.user._id; // Add the author id to the blog
    req.body.author = '6431b7780467a4b91b443dfe'; //Assuming user is signed in as Jagat
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
};

// Update a blog by id
const updateBlog = async (req, res, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.blogId, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedBlog) {
      return res.status(404).json({
        message: 'Blog not found'
      });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

// Delete a blog by id
const deleteBlog = async (req, res, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.blogId);
    if (!deletedBlog) {
      return res.status(404).json({
        message: 'Blog not found'
      });
    }
    res.status(200).json(deletedBlog);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};
