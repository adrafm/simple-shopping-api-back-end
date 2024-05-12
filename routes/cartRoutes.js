const express = require('express');
const cartController = require('./../controllers/cartController');

const router = express.Router();

router.route('/').post(cartController.createCart);
router.route('/:id').put(cartController.updatedCart).delete(cartController.deleteFromCart);
router.route('/find/:userId', cartController.getUserCart);

module.exports = router;