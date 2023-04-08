const mongoose = require('mongoose');
const User = require('../models/User');
const Blog = require('../models/blog');
const Comment = require('../models/comment');


require('dotenv').config()


const seedData = require('./seed.json');

mongoose.connect(process.env.DBURL, { useNewUrlParser: true });

async function seedDatabase() {
  try {
    // Delete any existing data
    await User.deleteMany();
    await Blog.deleteMany();
    await Comment.deleteMany();

    // Insert users
    const users = await User.insertMany(seedData.users);

    // Map author names to user IDs
    const authorIds = {};
    users.forEach(user => {
      authorIds[user.name] = user._id;
    });

    // Insert blogs and comments
    for (const blogData of seedData.blogs) {
      const authorId = authorIds[blogData.author];
      const commentsData = blogData.comments;
      delete blogData.comments;
      
      const blog = new Blog({ ...blogData, author: authorId });
      await blog.save();
      
      for (const commentData of commentsData) {
        const authorId = authorIds[commentData.author];
        const comment = new Comment({ ...commentData, author: authorId, blog: blog._id });
        await comment.save();
        blog.comments.push(comment._id);
      }
      
      await blog.save();
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
