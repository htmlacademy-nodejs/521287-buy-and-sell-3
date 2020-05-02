'use strict';

module.exports.DEFAULT_COMMAND = `--help`;
module.exports.USER_ARGV_INDEX = 2;
module.exports.ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};
module.exports.HttpCode = {
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
