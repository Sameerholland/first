const express = require('express');
const { CreateOrder, FetchOrder } = require('../controllers/Order');

const router = express.Router();

router.post('/create',CreateOrder)
      .post('/',FetchOrder)

exports.router = router;