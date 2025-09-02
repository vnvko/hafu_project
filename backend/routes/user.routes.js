const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware');
const UserController = require('../controllers/user.controller');

router.get('/profile', verifyToken, UserController.getProfile);

module.exports = router;
