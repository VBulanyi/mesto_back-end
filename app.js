const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const path = require('path');

const app = express();

// Парсер body
const bodyParser = require('body-parser');

const router = require('./routes/router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`You listen potr ${PORT}`);
});

// Тестовый вариант для авторизации, при создании user присваивается данный owner id
app.use((req, res, next) => {
  req.user = {
    _id: '5db82274432aab101860784a',
  };
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
