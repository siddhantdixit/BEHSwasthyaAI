const express = require('express');
var bodyParser = require('body-parser')

const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');

var bodyParser = require('body-parser');

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the MongoDB database using Mongoose
mongoose.connect(process.env.DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to the MongoDB database'))
.catch((error) => console.log('Error connecting to the MongoDB database:', error));

// Middleware
// app.use(express.json());
app.use(bodyParser.json())


// Routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal server error'
  });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
