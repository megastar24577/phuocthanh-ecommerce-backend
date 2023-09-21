'use strict';

const mongoose = require('mongoose');
const {
  db: { username, password, dbname },
} = require('../configs/config.mongodb');
const { countConnect, checkOverLoad } = require('../helpers/check.connect');
const connectionString = `mongodb+srv://${username}:${password}@${dbname}.vcrt83w.mongodb.net/`;

class Database {
  constructor() {
    this.connect();
  }

  //connect
  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose
      .connect(connectionString)
      .then((_) => {
        console.log(`Connection String: ${connectionString}`);
        console.log(`Connect mongo success`);
        countConnect();
        checkOverLoad();
      })
      .catch((err) => {
        console.log(`Connect error ${err}`);
      });
  }

  static getInstace() {
    if (!Database.instace) {
      Database.instace = new Database();
    }

    return Database.instace;
  }
}

const mongoDbInstance = Database.getInstace();
module.exports = mongoDbInstance;
