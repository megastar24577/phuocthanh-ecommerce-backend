'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECOND = 5000;

//count connect
const countConnect = () => {
  const numberOfConnection = mongoose.connections.length;
  console.log(`Number of connection ::: ${numberOfConnection}`);
};

//check overload
const checkOverLoad = () => {
  setInterval(() => {
    const numberOfConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsages = process.memoryUsage().rss;

    console.log(`Memory usage: ${memoryUsages / 1024 / 1024} MB`);

    const maxConnections = numCores * 5;
    if (numberOfConnection > maxConnections) {
      console.log(`Overload detected`);
    }
  }, _SECOND); //Monitor every 5 secs
};

module.exports = { countConnect, checkOverLoad };
