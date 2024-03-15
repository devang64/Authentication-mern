const express = require('express');
const router = express.Router();
const { signup, login, profile, logout } = require('../controller/User.Controller')

router.post('/signup', signup)
router.post('/login', login);
router.get('/logout', logout)

module.exports = router