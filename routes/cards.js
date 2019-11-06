const cardsRouter = require('express').Router();

const {
  createCard, getAllCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

// Роуты cards
cardsRouter.post('/cards', createCard);

cardsRouter.get('/cards', getAllCards);

cardsRouter.delete('/cards/:id', deleteCard);

cardsRouter.put('/cards/:cardId/likes', likeCard);

cardsRouter.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardsRouter;
