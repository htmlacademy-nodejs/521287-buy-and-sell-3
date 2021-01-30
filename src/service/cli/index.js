'use strict';

const version = require(`./version`);
const help = require(`./help`);
const generate = require(`./generate`);
const fill = require(`./fill`);
const fillDB = require(`./fill-db`);
const server = require(`./server`);

const Cli = {
  [version.name]: version,
  [help.name]: help,
  [generate.name]: generate,
  [fill.name]: fill,
  [fillDB.name]: fillDB,
  [server.name]: server,
};

module.exports = {
  Cli,
};
