const express = require('express');
const brandController = require('../controllers/brandController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(brandController.getAllBrands)
  .post(brandController.createBrand);

router
  .route('/:id')
  .patch(brandController.updateBrand)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    brandController.deleteBrand
  );

module.exports = router;
