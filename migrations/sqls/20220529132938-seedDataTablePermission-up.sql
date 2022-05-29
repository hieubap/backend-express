/* Replace with your SQL commands */
DELETE
FROM airsense.permission
WHERE id = 2;

UPDATE airsense.permission t
SET t.name      = 'CREATE_CUSTOMER',
    t.vi_name   = 'tạo khách hàng',
    t.parent_id = 16
WHERE t.id = 1;

UPDATE airsense.permission t
SET t.name      = 'DELETE_CUSTOMER',
    t.vi_name   = 'xóa khách hàng',
    t.parent_id = 16
WHERE t.id = 4;

UPDATE airsense.permission t
SET t.name      = 'UPDATE_CUSTOMER',
    t.vi_name   = 'cập nhật khách hàng',
    t.parent_id = 16
WHERE t.id = 3;

UPDATE airsense.permission t
SET t.name      = 'SEARCH_CUSTOMER',
    t.vi_name   = 'tìm kiếm thông tin khách hàng',
    t.parent_id = 16
WHERE t.id = 6;

UPDATE airsense.permission t
SET t.name      = 'DETAIL_CUSTOMER',
    t.vi_name   = 'xem thông tin khách hàng',
    t.parent_id = 16
WHERE t.id = 5;

INSERT INTO airsense.permission (name, created_at, updated_at, deleted_at, vi_name, parent_id)
VALUES ('MANAGE_ADMIN', DEFAULT, DEFAULT, null, 'Quản lý quản trị viên', null);

INSERT INTO airsense.permission (name, created_at, updated_at, deleted_at, vi_name, parent_id)
VALUES ('MANAGE_TEACHER', DEFAULT, DEFAULT, null, 'Quản lý giáo viên', null);

INSERT INTO airsense.permission (name, created_at, updated_at, deleted_at, vi_name, parent_id)
VALUES ('MANAGE_BLOGGER', DEFAULT, DEFAULT, null, 'Quản lý tác giả', null);

INSERT INTO airsense.permission (name, created_at, updated_at, deleted_at, vi_name, parent_id)
VALUES ('MANAGE_SENSOR_ADMIN', DEFAULT, DEFAULT, null, 'Quản lý quản trị viên trạm', null);

INSERT INTO airsense.permission (name, created_at, updated_at, deleted_at, vi_name, parent_id)
VALUES ('MANAGE_CUSTOMER', DEFAULT, DEFAULT, null, 'Quản lý khách hàng', null);




UPDATE airsense.permission t
SET t.vi_name = 'xóa , bật/tắt hoạt động khách hàng'
WHERE t.id = 4;

INSERT INTO airsense.permission (name, created_at, updated_at, deleted_at, vi_name, parent_id)
VALUES ('CREATE_ADMIN', DEFAULT, DEFAULT, null, 'tạo nhà quản trị', 15);

INSERT INTO airsense.permission (name, created_at, updated_at, deleted_at, vi_name, parent_id)
VALUES ('UPDATE_ADMIN', DEFAULT, DEFAULT, null, 'cập nhật nhà quản trị', 15);

INSERT INTO airsense.permission (name, created_at, updated_at, deleted_at, vi_name, parent_id)
VALUES ('DELETE_ADMIN', DEFAULT, DEFAULT, null, 'xóa , bật/tắt họat động nhà quản trị', 15);

INSERT INTO airsense.permission (name, created_at, updated_at, deleted_at, vi_name, parent_id)
VALUES ('DETAIL_ADMIN', DEFAULT, DEFAULT, null, 'xem thông tin nhà quản trị', 15);

INSERT INTO airsense.permission (name, created_at, updated_at, deleted_at, vi_name, parent_id)
VALUES ('SEARCH_ADMIN', DEFAULT, DEFAULT, null, 'tìm kiếm thông tin nhà quản trị', 15);

