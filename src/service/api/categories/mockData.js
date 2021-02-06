'use strict';

const mockCategories = [`Животные`, `Журналы`, `Игры`];

const offer1Categories = mockCategories.slice(0, 2);
const offer2Categories = mockCategories.slice(1, 2);
const offer3Categories = mockCategories.slice(-1);

const mockOffers = [
  {
    categories: offer1Categories,
    description: `Если найдёте дешевле — сброшу цену. Три по цене двух только до конца дня. Это настоящая находка для коллекционера! Продаю с болью в сердце...`,
    picture: `item06.jpg`,
    title: `Продам отличную подборку фильмов на VHS`,
    type: `SALE`,
    sum: 39776,
    comments: [
      {
        text: `Вы что?! В магазине дешевле. Оплата наличными или перевод на карту? Неплохо, но дорого.`,
      },
    ],
  },
  {
    categories: offer2Categories,
    description: `Товар в отличном состоянии. Это настоящая находка для коллекционера! Если найдёте дешевле — сброшу цену. Три по цене двух только до конца дня.`,
    picture: `item10.jpg`,
    title: `Продам шкаф для одежды`,
    type: `SALE`,
    sum: 62533,
    comments: [
      {
        text: `Совсем немного...`,
      },
      {
        text: `А где блок питания?`,
      },
      {
        text: `А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца. Неплохо, но дорого.`,
      },
      {
        text: `Почему в таком ужасном состоянии? А где блок питания?`,
      },
    ],
  },
  {
    categories: offer3Categories,
    description: `Таких предложений больше нет! Три по цене двух только до конца дня. Продаю с болью в сердце... Если найдёте дешевле — сброшу цену.`,
    picture: `item03.jpg`,
    title: `Продам новую приставку Sony Playstation 5`,
    type: `OFFER`,
    sum: 40323,
    comments: [
      {
        text: `А сколько игр в комплекте? Неплохо, но дорого. Вы что?! В магазине дешевле.`,
      },
      {
        text: `Вы что?! В магазине дешевле.`,
      },
      {
        text: `А где блок питания?`,
      },
    ],
  },
];

const mockOffersWithSecondCategory = mockOffers.filter((item) =>
  item.categories.includes(mockCategories[1])
);

module.exports = {
  mockCategories,
  mockOffers,
  mockOffersWithSecondCategory,
};
