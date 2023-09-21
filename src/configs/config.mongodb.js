'use strict';

const dev = {
  app: {
    port: process.env.DEV_PORT,
  },
  db: {
    username: process.env.MONGO_USERNAME_DEV,
    password: process.env.MONGO_PASSWORD_DEV,
    dbname: process.env.MONGO_DB_NAME_DEV,
  },
};

const production = {
  app: {
    port: process.env.PRO_PORT,
  },
  db: {
    username: process.env.MONGO_USERNAME_PRO,
    password: process.env.MONGO_PASSWORD_PRO,
    dbname: process.env.MONGO_DB_NAME_PRO,
  },
};

const config = { dev, production };
const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];
