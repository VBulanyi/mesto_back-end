const userRouter = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUser, getAllUsers, updateProfile, updateAvatar,
} = require('../controllers/users');

// Роуты user
// вернуть юзера по id
userRouter.get('/users/:id', auth, getUser);

// вернуть всех юзеров
userRouter.get('/users', auth, getAllUsers);

// обновить профиль юзера
userRouter.patch('/users/me', auth, updateProfile);

// обновить аватар
userRouter.patch('/users/me/avatar', auth, updateAvatar);

module.exports = userRouter;
