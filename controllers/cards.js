const Card = require('../models/card');
const { BadRequestError, NotFoundError } = require('../errors/error-handler');


// Контроллер создания карточки. На входе получает name и link
function createCard(req, res, next) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => { throw new BadRequestError('Не верные данные'); })
    .catch(next);
}

// Контроллер возвращает все карточки
function getAllCards(req, res, next) {
  Card.find({})
    .populate('user')
    .then((card) => res.send({ data: card }))
    .catch(() => { throw new NotFoundError('Карточки не созданы'); })
    .catch(next);
}

// Контроллер удаления карточки по ID
function deleteCard(req, res, next) {
  Card.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Вы не можете удалить эту карточку');
      } else res.send({ data: card });
    })
    .catch(next);
}

// Контроллер лайк карточки
function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => { throw new BadRequestError('Ошибка'); })
    .catch(next);
}
// Контроллер дислайк карточки
function dislikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => { throw new BadRequestError('Ошибка'); })
    .catch(next);
}

module.exports = {
  createCard, getAllCards, deleteCard, likeCard, dislikeCard,
};
