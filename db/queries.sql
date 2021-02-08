-- Список всех категорий
SELECT * FROM categories;

-- Список категорий, для которых создано минимум одно объявление
SELECT id, name FROM categories
	JOIN offer_categories
	ON id = category_id
	GROUP BY id;

-- Список категорий с количеством объявлений
SELECT id, name, count(offer_id) FROM categories
	LEFT JOIN offer_categories
	ON id = category_id
	GROUP BY id;

-- Список объявлений
SELECT * FROM offers;

-- Список объявлений, сначала свежие
SELECT
	offers.*,
	COUNT(comments.id) AS comments_count,
	STRING_AGG(DISTINCT categories.name, ', ') AS category_list,
	users.first_name,
	users.last_name,
	users.email
FROM offers
	JOIN offer_categories ON offers.id = offer_categories.offer_id
	JOIN categories ON offer_categories.category_id = category_id
	LEFT JOIN comments ON comments."offerId" = offers.id
	JOIN users ON users.id = offers.user_id
	GROUP BY offers.id, users.id;

-- Полная информация определённого объявления
SELECT
	offers.*,
	COUNT(comments.id) AS comments_count,
	STRING_AGG(DISTINCT categories.name, ', ') AS category_list,
	users.first_name,
	users.last_name,
	users.email
FROM offers
	JOIN offer_categories ON offers.id = offer_categories.offer_id
	JOIN categories ON offer_categories.category_id = category_id
	LEFT JOIN comments ON comments."offerId" = offers.id
	JOIN users ON users.id = offers.user_id
WHERE offers.id = 8
	GROUP BY offers.id, users.id;

-- 5 свежих комментариев
SELECT
	comments.id,
	comments."offerId",
	users.first_name,
	users.last_name,
	comments.text
FROM comments
	JOIN users ON comments.user_id = users.id
	ORDER BY comments."createdAt" DESC
	LIMIT 5;

-- Список комментариев для определённого объявления
SELECT
	comments.id,
	comments."offerId",
	users.first_name,
	users.last_name,
	comments.text
FROM comments
	JOIN users ON comments.user_id = users.id
WHERE comments."offerId" = 8
	ORDER BY comments."createdAt" DESC;

-- 2 объявления, соответствующих типу «куплю»
SELECT * FROM offers
WHERE type = 'OFFER'
  LIMIT 2;

-- Обновление заголовка определённого объявления
UPDATE offers
  SET title = 'Уникальное предложение!'
WHERE id = 8;
