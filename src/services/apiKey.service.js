'use strict';

const apikeysModel = require('../models/apikeys.model');
const crypto = require('crypto');

const findKeyById = async (key) => {
  // const newKey = await apikeysModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['0000'] });
  // console.log('newKey :::', newKey);
  const objKey = await apikeysModel.findOne({ key, status: true }).lean();
  return objKey;
};

module.exports = { findKeyById };
