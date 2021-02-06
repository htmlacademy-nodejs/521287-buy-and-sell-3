'use strict';

const version = require(`./version`);
const help = require(`./help`);
const fill = require(`./fill`);
const fillDB = require(`./fill-db`);
const server = require(`./server`);

const Cli = {
  [version.name]: version,
  [help.name]: help,
  [fill.name]: fill,
  [fillDB.name]: fillDB,
  [server.name]: server,
};

module.exports = {
  Cli,
};
