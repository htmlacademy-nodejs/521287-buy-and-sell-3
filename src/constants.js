'use strict';

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`,
};

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const API_PREFIX = `/api`;

module.exports = {
  ExitCode,
  HttpCode,
  Env,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  API_PREFIX,
};
