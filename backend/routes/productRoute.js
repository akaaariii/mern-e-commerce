const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

// @desc   Fetch all products
// @route  GET /api/products
router.get('/', productController.getAll);

// @desc   Fetch single products
// @route  GET /api/products/:id
router.get('/:id', productController.show);


module.exports = router;