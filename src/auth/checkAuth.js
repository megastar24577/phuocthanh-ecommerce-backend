'use strict';

const { findKeyById } = require('../services/apiKey.service');

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
};

//Check is key available if yes set authentication to header
const apiKeyMiddleware = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        message: 'Forbindden',
      });
    }

    const objKey = await findKeyById(key);
    if (!objKey) {
      return res.status(403).json({
        message: 'Forbindden',
      });
    }

    req.objKey = objKey;
    return next();
  } catch (error) {
    console.log(`error ${error}`);
  }
};

const permissionMiddleware = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: 'Unauthorized',
      });
    }

    const isValidPermission = req.objKey.permissions.includes(permission);
    if (!isValidPermission) {
      return res.status(403).json({
        message: 'Unauthorized',
      });
    }

    return next();
  };
};

const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = {
  apiKeyMiddleware,
  permissionMiddleware,
  asyncHandler,
};
