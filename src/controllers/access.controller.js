'use strict';

const { OK, CREATED } = require('../core/success.response');
const AccessService = require('../services/access.service');

class AccessController {
  signUp = async (req, res, next) => {
    const result = await AccessService.signUp(req.body);

    return new CREATED({
      message: 'Shop Created Successfully!',
      metadata: result.metadata,
    }).send(res);
  };
}

module.exports = new AccessController();
