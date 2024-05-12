const express = require('express');
const orderController = require('./../controllers/orderController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').post(authController.protect, orderController.createOrder).get(authController.restrictTo('admin'), orderController.getAllOrders);
router.route('/:id').put(authController.protect, orderController.updateOrder).delete(authController.protect, orderController.deleteOrder);
router.route('/find/:userId').get(authController.protect, orderController.getUserOrders);
router.route('/income').get(authController.restrictTo('admin'), orderController.getMonthlyIncome);

module.exports = router;
