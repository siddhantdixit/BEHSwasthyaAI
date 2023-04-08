const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/users - Get all users
router.get('/', userController.getAllUsers);

// GET /api/users/:userId - Get a user by id
router.get('/:userId', userController.getUserById);

// POST /api/users - Create a new user
router.post('/', userController.createUser);

// PUT /api/users/:userId - Update a user by id
router.put('/:userId', userController.updateUser);

// DELETE /api/users/:userId - Delete a user by id
router.delete('/:userId', userController.deleteUser);

module.exports = router;
