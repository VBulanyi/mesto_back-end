const cardsRouter = require('express').Router();

const { createCard, getAllCards, deleteCard } = require('../controllers/cards');

// Роуты cards
cardsRouter.post('/cards', createCard);

cardsRouter.get('/cards', getAllCards);

cardsRouter.delete('/cards/:id', deleteCard);

module.exports = cardsRouter;
