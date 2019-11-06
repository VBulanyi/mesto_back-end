const userRouter = require('express').Router();

const {
  createUser, getUser, getAllUsers, updateProfile, updateAvatar,
} = require('../controllers/users');

// Роуты user
userRouter.get('/users/:id', getUser);

userRouter.get('/users', getAllUsers);

userRouter.post('/users', createUser);

userRouter.patch('/users/me', updateProfile);

userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
