const Card = require('../models/card');

// Контроллер создания карточки. На входе получает name и link
function createCard(req, res) {
  const { name, link } = req.body;

  // Временное решение для авторизации
  const id = req.user._id;
  Card.create({ name, link, owner: id })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

// Контроллер возвращает все карточки
function getAllCards(req, res) {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

// Контроллер удаления карточки по ID
function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) res.status(404).send({ message: 'нет такой карточки' });
      else res.send({ data: card });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

// Контроллер лайк карточки
function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
}
// Контроллер дислайк карточки
function dislikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

module.exports = {
  createCard, getAllCards, deleteCard, likeCard, dislikeCard,
};
