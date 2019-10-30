const Card = require('../models/card');

// Контроллер создания карточки. На входе получает name и link
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  // Временное решение для авторизации
  const id = req.user._id
  Card.create({ name, link, owner: id })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

// Контроллер возвращает все карточки
module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

// Контроллер удаления карточки по ID
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};
