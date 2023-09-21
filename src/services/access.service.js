'use strict';

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keytoken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils/index');

const RoleShop = {
  SHOP: '00001',
  WRITER: '00002',
  EDITOR: '00003',
  ADMIN: '10000',
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      const shop = await shopModel.findOne({ email }).lean();

      if (shop) {
        return {
          code: 400,
          message: 'Shop already registered',
          status: 'error',
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: hashedPassword,
        roles: [RoleShop.SHOP],
      });

      if (newShop) {
        //create private and public for authentication
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });

        if (!keyStore) {
          return {
            code: 400,
            message: 'publicKeyString error',
            status: 'keyStore error',
          };
        }

        //create token pair
        const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey);

        console.log(`Create token successfully :: ${tokens}`);
        return {
          code: 200,
          metadata: {
            shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
            tokens,
          },
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
        status: 'error',
      };
    }
  };
}

module.exports = AccessService;
