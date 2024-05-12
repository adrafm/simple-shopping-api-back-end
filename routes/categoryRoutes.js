const express = require('express');
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, categoryController.getAllCategories)
  .post(categoryController.createCategory);

router
  .route('/:id')
  .patch(categoryController.updateCategory)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.deleteCategory
  );

module.exports = router;
