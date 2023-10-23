const express = require('express');
const authController = require('../Controller/authController');
const jwtUtil = require('../Util/jwtUtil');

const router = express.Router();

router.get(
  '/login/profile/:Id',
  jwtUtil.verifyToken('admin'),
  authController.getUserProfile
);
router.post('/login/signin', authController.signIn);
module.exports = router;
