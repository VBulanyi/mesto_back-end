require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const path = require('path');

const app = express();

// Парсер body
const bodyParser = require('body-parser');

const router = require('./routes/router');
const { signin, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

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

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', auth, router);
app.use('/cards', auth, router);
app.post('/signup', createUser);
app.post('/signin', signin);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
