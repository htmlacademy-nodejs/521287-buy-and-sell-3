'use strict';

const chalk = require(`chalk`);

module.exports = {
  name: `--help`,
  run() {
    const text = `Программа запускает ХТПП-сервер и формирует файл с данными для АПИ.

    Гайд:
    server <command>

    Команды:
    --version             выводит номер версии
    --help                печатает этот текст
    --fill <count>        формирует файл fill-db-auto.sql
    --fill-db <count>     наполняет базу данных рыбой
    --server <port>       запускает ХТТП-сервер
    `;

    console.info(chalk.gray(text));
  },
};
