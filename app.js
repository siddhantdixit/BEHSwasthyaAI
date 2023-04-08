const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the MongoDB database using Mongoose
mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to the MongoDB database'))
.catch((error) => console.log('Error connecting to the MongoDB database:', error));

// Middleware
app.use(express.json());


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal server error'
  });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
