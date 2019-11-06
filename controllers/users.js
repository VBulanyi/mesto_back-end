const User = require('../models/user');

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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

// Контроллер обновление профайла
function updateProfile(req, res) {
  const { newName, newAbout } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name: newName, about: newAbout },
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
  const { newAvatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: newAvatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'not validated' }));
}

module.exports = {
  getUser, getAllUsers, createUser, updateProfile, updateAvatar,
};
