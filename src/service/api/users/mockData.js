'use strict';

const passwordUtils = require(`../../lib/password`);

const PASSWORD = `qwerty1234`;
const ValidUserData = {
  name: `Сидор Сидоров`,
  email: `sidorov@example.com`,
  password: PASSWORD,
  passwordRepeated: PASSWORD,
  avatar: `sidorov.jpg`,
};

const mockUsers = [
  {
    name: `Иван Иванов`,
    email: `ivanov@example.com`,
    passwordHash: passwordUtils.hashSync(`ivanov`),
    avatar: `avatar01.jpg`,
  },
  {
    name: `Пётр Петров`,
    email: `petrov@example.com`,
    passwordHash: passwordUtils.hashSync(`petrov`),
    avatar: `avatar01.jpg`,
  },
];

module.exports = {
  ValidUserData,
  mockUsers,
};
