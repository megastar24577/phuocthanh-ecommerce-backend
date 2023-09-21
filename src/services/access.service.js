'use strict';

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keytoken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils/index');
const { BadRequestError, InternalServerError } = require('../core/error.response');

const RoleShop = {
  SHOP: '00001',
  WRITER: '00002',
  EDITOR: '00003',
  ADMIN: '10000',
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    const shop = await shopModel.findOne({ email }).lean();

    if (shop) {
      throw new BadRequestError('Error: Shop already registered!');
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
        throw new InternalServerError('Error: Public Key String Error');
      }

      //create token pair
      const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey);

      console.log(`Create token successfully :: ${tokens}`);
      return {
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
  };
}

module.exports = AccessService;
