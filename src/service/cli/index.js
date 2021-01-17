'use strict';

const help = require(`./help`);
const fillDB = require(`./fill-db`);
const version = require(`./version`);
const server = require(`./server`);

const Cli = {
  [fillDB.name]: fillDB,
  [help.name]: help,
  [version.name]: version,
  [server.name]: server,
};

module.exports = {
  Cli,
};
