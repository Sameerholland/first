const express = require('express');
const { AddToCart, UpdateCart, DeleteCart, GetCart } = require('../controllers/Cart');

const router = express.Router();
router.post('/add',AddToCart)
      .post('/Cart',GetCart)
      .post('/update', UpdateCart)
      .delete('/delete/:id',DeleteCart)

exports.router = router;