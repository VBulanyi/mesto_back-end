const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { BadRequestError, ValidationError, NotFoundError } = require('../errors/error-handler');

const { NODE_ENV, JWT_SECRET } = process.env;

// Контроллер возвращает user по ID
function getUser(req, res, next) {
  User.find({ _id: req.params.id })
    .then((user) => {
      if (!user.length > 0) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send({ data: user });
    })
    .catch(next);
}

// Контроллер возвращает всех user
function getAllUsers(req, res, next) {
  User.find({})
    .then((user) => {
      if (!user.length > 0) {
        throw new NotFoundError('Нет ни одного пользователя');
      }
      res.send({ data: user });
    })
    .catch(next);
}

// Контроллер создания user
function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 12)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch(() => { throw new BadRequestError('Не верные данные'); })
    .catch(next);
}

// Контроллер обновление профайла
function updateProfile(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch(() => { throw new BadRequestError('Не верные данные'); })
    .catch(next);
}


// Контроллер обновление аватара
function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch(() => { throw new BadRequestError('Не верные данные'); })
    .catch(next);
}

// Котроллер входа
function signin(req, res, next) {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new ValidationError('Не верный логин или пароль');
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: false,
      })
        .end();
    })
    .catch(next);
}

module.exports = {
  getUser, getAllUsers, createUser, updateProfile, signin, updateAvatar,
};
