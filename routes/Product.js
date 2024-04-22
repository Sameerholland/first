const express = require('express');
const { AddProducts, FetchAllProducts, FetchProductByID, FetchProductsByCategory } = require('../controllers/Product');
const router = express.Router();

router.post('/add',AddProducts)
      .get('/products',FetchAllProducts)
      .post('/Fetchproductbyid',FetchProductByID)
      .post('/FetchProductBycategory', FetchProductsByCategory)

exports.router = router