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
    --fill-db <count>     наполняет базу данных
    --server <port>       запускает ХТТП-сервер
    `;

    console.info(chalk.gray(text));
  },
};
