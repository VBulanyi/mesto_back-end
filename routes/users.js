const userRouter = require('express').Router();

const { createUser, getUser, getAllUsers } = require('../controllers/users');

// Роуты user
userRouter.get('/users/:id', getUser);

userRouter.get('/users', getAllUsers);

userRouter.post('/users', createUser);

module.exports = userRouter;
