const userRouter = require('express').Router();

const {
  createUser, getUser, getAllUsers, updateProfile, updateAvatar,
} = require('../controllers/users');

// Роуты user
// вернуть юзера по id
userRouter.get('/users/:id', getUser);

// вернуть всех юзеров
userRouter.get('/users', getAllUsers);

// создать юзера
userRouter.post('/users', createUser);

// обновить профиль юзера
userRouter.patch('/users/me', updateProfile);

// обновить аватар
userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
