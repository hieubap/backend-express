/* Replace with your SQL commands */
DELETE
FROM airsense.permission
WHERE id = 9;

DELETE
FROM airsense.permission
WHERE id = 11;

DELETE
FROM airsense.permission
WHERE id = 10;

INSERT INTO airsense.permission (name, created_at, updated_at, deleted_at)
VALUES ('SEARCH_MANIFEST', DEFAULT, DEFAULT, null);

INSERT INTO airsense.permission (name, created_at, updated_at, deleted_at)
VALUES ('DELETE_MANIFEST', DEFAULT, DEFAULT, null);

INSERT INTO airsense.permission (name, created_at, updated_at, deleted_at)
VALUES ('DETAIL_MANIFEST', DEFAULT, DEFAULT, null);

