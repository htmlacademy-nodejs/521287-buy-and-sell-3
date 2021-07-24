'use strict';

const {mockUsers} = require(`../users/mockData`);

const mockCategories = [
  `Книги`,
  `Цветы`,
  `Животные`,
  `Разное`
];

const foundOfferTitle = `Продам новую приставку Sony Playstation 5`;

const mockOffers = [
  {
    "user": mockUsers[0].email,
    "categories": [
      `Книги`,
      `Разное`
    ],
    "comments": [
      {
        "user": mockUsers[1].email,
        "text": `Почему в таком ужасном состоянии?`
      },
      {
        "user": mockUsers[0].email,
        "text": `Продаю в связи с переездом. Отрываю от сердца. А где блок питания?`
      }
    ],
    "description": `Таких предложений больше нет! Это настоящая находка для коллекционера! При покупке с меня бесплатная доставка в черте города. Если найдёте дешевле — сброшу цену.`,
    "picture": `item09.jpg`,
    "title": foundOfferTitle,
    "type": `SALE`,
    "sum": 79555
  },
  {
    "user": mockUsers[1].email,
    "categories": [
      `Цветы`,
      `Животные`
    ],
    "comments": [
      {
        "user": mockUsers[0].email,
        "text": `Неплохо, но дорого. Совсем немного... Оплата наличными или перевод на карту?`
      },
      {
        "user": mockUsers[1].email,
        "text": `С чем связана продажа? Почему так дешёво? Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "user": mockUsers[0].email,
        "text": `Неплохо, но дорого. Совсем немного...`
      },
      {
        "user": mockUsers[1].email,
        "text": `Вы что?! В магазине дешевле.`
      }
    ],
    "description": `При покупке с меня бесплатная доставка в черте города. Даю недельную гарантию. Это настоящая находка для коллекционера! Бонусом отдам все аксессуары.`,
    "picture": `item02.jpg`,
    "title": `Продам отличную подборку фильмов на VHS`,
    "type": `SALE`,
    "sum": 55460
  },
  {
    "user": mockUsers[0].email,
    "categories": [
      `Животные`
    ],
    "comments": [
      {
        "user": mockUsers[1].email,
        "text": `Оплата наличными или перевод на карту? Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво?`
      }
    ],
    "description": `Даю недельную гарантию. Продаю с болью в сердце... Товар в отличном состоянии. Если найдёте дешевле — сброшу цену.`,
    "picture": `item12.jpg`,
    "title": `Куплю породистого кота`,
    "type": `SALE`,
    "sum": 81801
  }
];

module.exports = {
  mockCategories,
  mockOffers,
  foundOfferTitle,
};
