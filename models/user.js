const mongoose = require('mongoose');
const validate = require('mongoose-validator')

// Валидация url
const isURL = [
  validate({
    validator: 'matches',
    arguments: /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i,
    message: 'Must be a Valid URL',
  }),
];

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
    validate: isURL,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
