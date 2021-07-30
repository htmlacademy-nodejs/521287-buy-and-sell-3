'use strict';

const {mockUsers} = require(`../users/mockData`);

const VALID_DESCRIPTION = `Продаю с болью в сердечке, со скрипом на душеньке моей...`;

const mockCategories = [
  `Животные`,
  `Посуда`,
  `Марки`,
  `Разное`,
  `Книги`
];

const mockOfferFirstTitle = `Куплю антиквариат в хорошем виде`;
const mockOfferFirstComments = [
  {
    "user": mockUsers[1].email,
    "text": `Неплохо, но дорого. Оплата наличными или перевод на карту? Продаю в связи с переездом. Отрываю от сердца.`
  },
  {
    "user": mockUsers[0].email,
    "text": `А где блок питания? Неплохо, но дорого.`
  },
  {
    "user": mockUsers[1].email,
    "text": `Оплата наличными или перевод на карту?`
  },
  {
    "user": mockUsers[0].email,
    "text": `Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту?`
  }
];
const mockOfferSecondTitle = `Продам розового слона с длинным хоботом`;
const mockOfferSecondComments = [
  {
    "text": `Почему в таком ужасном состоянии?`
  },
  {
    "text": `Продаю в связи с переездом. Отрываю от сердца.`
  },
  {
    "text": `С чем связана продажа? Почему так дешёво? Вы что?! В магазине дешевле. Оплата наличными или перевод на карту?`
  }
];

const mockOffers = [
  {
    "user": mockUsers[0].email,
    "categories": [
      `Животные`,
      `Марки`,
    ],
    "comments": mockOfferFirstComments,
    "description": `Продаю с болью в сердце... Даю недельную гарантию. Если найдёте дешевле — сброшу цену. Если товар не понравится — верну всё до последней копейки.`,
    "picture": `item02.jpg`,
    "title": mockOfferFirstTitle,
    "type": `OFFER`,
    "sum": 10405
  },
  {
    "categories": [
      `Посуда`
    ],
    "comments": mockOfferSecondComments,
    "description": `Если товар не понравится — верну всё до последней копейки. Если найдёте дешевле — сброшу цену. При покупке с меня бесплатная доставка в черте города. Бонусом отдам все аксессуары.`,
    "picture": `item12.jpg`,
    "title": mockOfferSecondTitle,
    "type": `SALE`,
    "sum": 96693
  },
  {
    "user": mockUsers[1].email,
    "categories": [
      `Марки`
    ],
    "comments": [
      {
        "user": mockUsers[0].email,
        "text": `А сколько игр в комплекте? Почему в таком ужасном состоянии?`
      },
      {
        "user": mockUsers[1].email,
        "text": `Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле.`
      },
      {
        "user": mockUsers[0].email,
        "text": `Совсем немного... Почему в таком ужасном состоянии?`
      },
      {
        "user": mockUsers[1].email,
        "text": `А где блок питания?`
      }
    ],
    "description": `Таких предложений больше нет! Даю недельную гарантию. Это настоящая находка для коллекционера! Если товар не понравится — верну всё до последней копейки.`,
    "picture": `item12.jpg`,
    "title": `Продам отличную подборку фильмов на VHS`,
    "type": `OFFER`,
    "sum": 54666
  },
  {
    "user": mockUsers[0].email,
    "categories": [
      `Разное`,
      `Марки`,
      `Посуда`
    ],
    "comments": [
      {
        "user": mockUsers[1].email,
        "text": `А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца.`
      }
    ],
    "description": `Если найдёте дешевле — сброшу цену. При покупке с меня бесплатная доставка в черте города. Таких предложений больше нет! Бонусом отдам все аксессуары.`,
    "picture": `item13.jpg`,
    "title": `Продам отличную подборку фильмов на VHS`,
    "type": `OFFER`,
    "sum": 29392
  },
  {
    "user": mockUsers[1].email,
    "categories": [
      `Книги`
    ],
    "comments": [
      {
        "user": mockUsers[0].email,
        "text": `Продаю в связи с переездом. Отрываю от сердца.`
      }
    ],
    "description": `Продаю с болью в сердце... Бонусом отдам все аксессуары. Это настоящая находка для коллекционера! Даю недельную гарантию.`,
    "picture": `item16.jpg`,
    "title": `Продам отличную подборку фильмов на VHS`,
    "type": `SALE`,
    "sum": 46020
  }
];

module.exports = {
  VALID_DESCRIPTION,
  mockCategories,
  mockOffers,
  mockOfferFirstTitle,
  mockOfferFirstComments,
  mockOfferSecondTitle,
  mockOfferSecondComments,
};
