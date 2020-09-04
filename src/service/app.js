'use strict';

const express = require(`express`);
const {readFile} = require(`fs`).promises;
const chalk = require(`chalk`);

const {HttpCode, API_PREFIX} = require(`../constants`);
const routes = require(`./api`);

const FILENAME = `mocks.json`;

const app = express();

app.use(express.json());
app.use(API_PREFIX, routes);

app.get(`/offers`, async (req, res) => {
  try {
    const fileContent = await readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    console.error(chalk.red(`Error with "/offers" route: ${err}`));
    res.status(HttpCode.INTERNAL_SERVER_ERROR);
    res.end();
  }
});

app.use((req, res) => res.status(HttpCode.NOT_FOUND).send(`Not found`));

module.exports = app;
