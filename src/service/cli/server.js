"use strict";

const chalk = require(`chalk`);
const express = require(`express`);
const {readFile} = require(`fs`).promises;

const {HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    const app = express();

    app.use(express.json());

    app.get(`/offers`, async (req, res) => {
      try {
        const fileContent = await readFile(FILENAME);
        const mocks = JSON.parse(fileContent);
        res.json(mocks);
      } catch (err) {
        console.error(`Error with "/offers" route: ${err}`);
        res.status(HttpCode.INTERNAL_SERVER_ERROR);
      }
    });

    app.use((req, res) => res
    .status(HttpCode.NOT_FOUND)
    .send(`Not found`));

    app.listen(port, (err) => {
      if (err) {
        console.error(`Ошибка при создании сервера ${err}`);
      }

      console.info(chalk.green(`Ожидаю соединение на ${port}`));
    });
  },
};
