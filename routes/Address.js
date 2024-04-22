const express = require('express');
const { AddAddress, fetchAddress, DeleteAddress } = require('../controllers/Address');

const router = express.Router();

router.post('/add',AddAddress)
      .post('/', fetchAddress)
      .delete('/delete/:id',DeleteAddress)

exports.router = router;