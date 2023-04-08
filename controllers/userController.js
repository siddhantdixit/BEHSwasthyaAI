const User = require('../models/User');
const Blog = require('../models/blog');
const Comment = require('../models/comment');

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Get a user by id
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Create a new user
const createUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

// Update a user by id
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Delete a user by id
const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};

const findKthFriend =  async (req, res, next) => {

  const { userId, levelNo } = req.params;
  const k = parseInt(levelNo); // convert levelNo to an integer
  if (isNaN(k) || k < 1) {
    return res.status(400).json({ message: 'Invalid level number' });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find all blogs where the user has commented
    const blogs = await Blog.find()
  .populate({
    path: 'comments',
    match: { author: userId },
    select: '_id'
  })
  .exec()
  const result = blogs.filter(blog => blog.comments.length > 0);
  console.log(result);
  console.log(blogs)



    let friends = new Set(); // Use a set to store unique friends
    let firstLevelFriends = new Set(); // Use a set to store unique first-level friends
    let visitedBlogs = new Set(); // Use a set to keep track of visited blogs
    let visitedUsers = new Set(); // Use a set to keep track of visited users

    // Add the user's first-level friends to the set
    for (const blog of blogs) {
      for (const comment of blog.comments) {
        if (comment.author.toString() !== userId) {
          firstLevelFriends.add(comment.author.toString());
        }
      }
    }

    // Perform BFS to find friends at k-th level
    let queue = [...firstLevelFriends]; // Initialize the queue with first-level friends
    visitedUsers = new Set(queue); // Mark first-level friends as visited

    for (let i = 2; i <= k; i++) {
      const nextLevelFriends = new Set();

      for (const userId of queue) {
        // Find all blogs where the user has commented
        const blogs = await Blog.find({ 'comments.author': userId });

        for (const blog of blogs) {
          // Skip blogs that have already been visited
          if (visitedBlogs.has(blog._id.toString())) {
            continue;
          }

          // Add all users who have commented on the same blog as the current user
          for (const comment of blog.comments) {
            const friendId = comment.author.toString();

            if (!visitedUsers.has(friendId) && friendId !== userId) {
              if (i === k) {
                friends.add(friendId);
              } else {
                nextLevelFriends.add(friendId);
              }
            }
          }

          visitedBlogs.add(blog._id.toString()); // Mark the blog as visited
        }
      }

      visitedUsers = new Set([...visitedUsers, ...nextLevelFriends]); // Mark next-level friends as visited
      queue = [...nextLevelFriends]; // Update the queue for the next level
    }

    res.json({ friends: [...friends] }); // Convert the set to an array and send the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  findKthFriend
};
