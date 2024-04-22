const express = require('express');
const { CreateUser, LoginUser, CheckUser, UpdatePassword } = require('../controllers/Auth');

const router = express.Router();
const passport = require('passport')

router.post('/add',CreateUser)
.post('/login', passport.authenticate('local'), LoginUser)
.get('/check', passport.authenticate('jwt'),CheckUser)
.get('/update',UpdatePassword)

exports.router = router