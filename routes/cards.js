const cardsRouter = require('express').Router();
const auth = require('../middlewares/auth');

const {
  createCard, getAllCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

// Роуты cards
cardsRouter.post('/cards', auth, createCard);

cardsRouter.get('/cards', auth, getAllCards);

cardsRouter.delete('/cards/:id', auth, deleteCard);

cardsRouter.put('/cards/:cardId/likes', auth, likeCard);

cardsRouter.delete('/cards/:cardId/likes', auth, dislikeCard);

module.exports = cardsRouter;
