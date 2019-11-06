const router = require('express').Router();

const userRouter = require('./cards');
const cardsRouter = require('./users');

router.use(userRouter);
router.use(cardsRouter);

module.exports = router;
