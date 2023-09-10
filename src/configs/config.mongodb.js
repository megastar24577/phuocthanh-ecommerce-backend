"use strict";

const dev = {
  app: {
    port: process.env.DEV_PORT,
  },
  db: {
    host: process.env.MONGO_USERNAME_DEV,
    port: process.env.MONGO_PASSWORD_DEV,
    name: process.env.MONGO_DB_NAME_DEV,
  },
};

const production = {
  app: {
    port: process.env.PRO_PORT,
  },
  db: {
    host: process.env.MONGO_USERNAME_PRO,
    port: process.env.MONGO_PASSWORD_PRO,
    name: process.env.MONGO_DB_NAME_PRO,
  },
};

const config = { dev, production };
const env = process.env.NODE_ENV || "dev";
module.exports = config[env];
