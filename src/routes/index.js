'use strict';

const express = require('express');
const { apiKeyMiddleware, permissionMiddleware } = require('../auth/checkAuth');
const router = express.Router();

//check authentication
router.use(apiKeyMiddleware);
//check authorization
router.use(permissionMiddleware('0000'));

router.use('/v1/api', require('./access'));

// router.get("", (req, res, next) => {
//   return res.status(200).json({
//     message: "Hello world",
//   });
// });

module.exports = router;
