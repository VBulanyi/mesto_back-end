const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

// Модель user в БД
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'не является ссылкой',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'не является адресом электронной почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    })
    .catch((error) => error);
};

module.exports = mongoose.model('user', userSchema);
