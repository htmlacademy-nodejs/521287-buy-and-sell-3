
INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
('ivanov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Иванов', 'avatar1.jpg'),
('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Пётр', 'Петров', 'avatar2.jpg');

INSERT INTO categories(name, "createdAt", "updatedAt") VALUES
('Книги', now(), now()),
('Разное', now(), now()),
('Посуда', now(), now()),
('Игры', now(), now()),
('Животные', now(), now()),
('Журналы', now(), now()),
('Пазлы', now(), now()),
('Спорт', now(), now()),
('Мебель', now(), now());

ALTER TABLE offers DISABLE TRIGGER ALL;
INSERT INTO offers(title, description, type, sum, picture, user_id, "createdAt", "updatedAt") VALUES
('Продам новую приставку Sony Playstation 5', 'При покупке с меня бесплатная доставка в черте города. Товар в отличном состоянии. Три по цене двух только до конца дня. Если товар не понравится — верну всё до последней копейки.', 'OFFER', 63636, 'item06.jpg', 2, now(), now()),
('Куплю антиквариат', 'Бонусом отдам все аксессуары. Пользовались бережно и только по большим праздникам. Если найдёте дешевле — сброшу цену. Это настоящая находка для коллекционера!', 'OFFER', 1164, 'item14.jpg', 2, now(), now());
ALTER TABLE offers ENABLE TRIGGER ALL;

ALTER TABLE offer_categories DISABLE TRIGGER ALL;
INSERT INTO offer_categories(offer_id, category_id) VALUES
(1, 5),
(2, 7);
ALTER TABLE offer_categories ENABLE TRIGGER ALL;

ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO COMMENTS(text, user_id, "offerId", "createdAt", "updatedAt") VALUES
('А где блок питания?', 2, 1, now(), now()),
('А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии?', 1, 1, now(), now()),
('Продаю в связи с переездом. Отрываю от сердца. Оплата наличными или перевод на карту? Неплохо, но дорого.', 2, 1, now(), now()),
('Вы что?! В магазине дешевле.', 1, 2, now(), now()),
('Почему в таком ужасном состоянии? Неплохо, но дорого. Оплата наличными или перевод на карту?', 1, 2, now(), now());
ALTER TABLE comments ENABLE TRIGGER ALL;