const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

// Контроллер возвращает user по ID
function getUser(req, res) {
  User.find({ _id: req.params.id })
    .then((user) => {
      if (user.length > 0) res.send({ data: user });
      else res.status(404).send({ message: 'пользователя не существует' });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

// Контроллер возвращает всех user
function getAllUsers(req, res) {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

// Контроллер создания user
function createUser(req, res) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 12)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

// Контроллер обновление профайла
function updateProfile(req, res) {
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
    .catch(() => res.status(400).send({ message: 'not validated' }));
}

// Контроллер обновление аватара
function updateAvatar(req, res) {
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
    .catch(() => res.status(400).send({ message: 'not validated' }));
}

// Котроллер входа
function signin(req, res) {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        res.status(401).send({ message: 'не верный логин или пароль' });
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      })
        .end();
    })
    .catch((err) => res.status(401).send({ message: err.message }));
}

module.exports = {
  getUser, getAllUsers, createUser, updateProfile, signin, updateAvatar,
};
