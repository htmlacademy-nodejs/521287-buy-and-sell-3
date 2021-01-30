INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
  ('ivanov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Иванов', 'avatar1.jpg'),
  ('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Пётр', 'Петров', 'avatar2.jpg');

INSERT INTO categories(name, "createdAt", "updatedAt") VALUES
  ('Животные', now(), now()),
  ('Игры', now(), now()),
  ('Разное', now(), now());

ALTER TABLE offers DISABLE TRIGGER ALL;
INSERT INTO offers(title, description, type, sum, picture, "createdAt", "updatedAt", user_id) VALUES
  ('Куплю гараж', 'Куплю гараж, чтобы держать там крокодила', 'OFFER', 10000, 'image1.jpg', now(), now(), 1),
  ('Продам гараж', 'Продам гараж, где можно держать крокодила', 'SALE', 10000, 'image2.jpg', now(), now(), 2),
  ('Куплю крокодила', 'Куплю крокодила, чтобы держать в гараже', 'OFFER', 1000, 'image3.jpg', now(), now(), 2),
  ('Продам крокодила', 'Продам крокодила, которого можно держать в гараже', 'SALE', 1000, 'image4.jpg', now(), now(), 1),
  ('Продам крокодиловую сумку', 'Продам сумку из крокодиловой кожи, изготовление а заказ', 'SALE', 2000, 'image5.jpg', now(), now(), 1);
ALTER TABLE offers ENABLE TRIGGER ALL;

ALTER TABLE offer_categories DISABLE TRIGGER ALL;
INSERT INTO offer_categories(offer_id, category_id) VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 2),
  (3, 1),
  (4, 1),
  (5, 3);
ALTER TABLE offer_categories ENABLE TRIGGER ALL;

ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO COMMENTS(text, user_id, "offerId", "createdAt", "updatedAt") VALUES
  ('Купи мой гараж', 2, 1, now(), now()),
  ('Купи, кому говорю', 2, 1, now(), now()),
  ('Плохой гараж', 1, 2, now(), now()),
  ('Не куплю', 1, 2, now(), now()),
  ('Купи крокодила', 1, 3, now(), now()),
  ('Отличный крокодил', 1, 3, now(), now()),
  ('Не куплю крокодила', 2, 4, now(), now()),
  ('Дрянной крокодил', 2, 4, now(), now()),
  ('Пожалей крокодила', 2, 5, now(), now()),
  ('Держать негде', 1, 5, now(), now());
ALTER TABLE comments ENABLE TRIGGER ALL;
