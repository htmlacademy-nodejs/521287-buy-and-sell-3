'use strict';

const checkAuth = require(`./checkAuth`);
const checkNotAuth = require(`./checkNotAuth`);
const upload = require(`./upload`);

module.exports = {
  checkAuth,
  checkNotAuth,
  upload,
};
