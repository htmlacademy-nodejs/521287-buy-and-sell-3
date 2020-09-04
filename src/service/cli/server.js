'use strict';

const chalk = require(`chalk`);

const app = require(`../app`);

const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app
      .listen(port, () => {
        console.info(chalk.green(`Ожидаю соединение на ${port}`));
      })
      .on(`error`, (err) => {
        console.error(chalk.red(`Ошибка при создании сервера ${err}`));
      });
  },
};
