const express = require('express');
const commentController = require('./../controllers/commentController');

const router = express.Router();

router.route('/:productId').get(commentController);

module.exports = router;
