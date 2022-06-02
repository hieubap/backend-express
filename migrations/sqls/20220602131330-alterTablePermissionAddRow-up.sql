/* Replace with your SQL commands */
UPDATE airsense.permission t
SET t.vi_name = 'tạo quyền hạn'
WHERE t.id = 7;

UPDATE airsense.permission t
SET t.vi_name = 'cập nhật quyền hạn'
WHERE t.id = 8;

UPDATE airsense.permission t
SET t.vi_name = 'chi tiết quyền hạn'
WHERE t.id = 14;

UPDATE airsense.permission t
SET t.vi_name = 'tìm kiếm quyền hạn'
WHERE t.id = 12;

UPDATE airsense.permission t
SET t.vi_name = 'xóa hoạt động khách hàng'
WHERE t.id = 4;

UPDATE airsense.permission t
SET t.vi_name = 'xóa quyền hạn'
WHERE t.id = 13;

UPDATE airsense.permission t
SET t.vi_name = 'xóa hoạt động nhà quản trị'
WHERE t.id = 22;

INSERT INTO airsense.permission (name, created_at, updated_at, deleted_at, vi_name, parent_id)
VALUES ('ACTIVE_USER', DEFAULT, DEFAULT, null, 'bật tắt hoạt động tài khoản khách hàng', null);

INSERT INTO airsense.permission (name, created_at, updated_at, deleted_at, vi_name, parent_id)
VALUES ('ACTIVE_ADMIN', DEFAULT, DEFAULT, null, 'bật tắt hoạt động tài khoản quản trị viên', null);

INSERT INTO airsense.permission (name, created_at, updated_at, deleted_at, vi_name, parent_id)
VALUES ('ACTIVE_MANIFEST', DEFAULT, DEFAULT, null, 'bật tắt hoạt động quyền hạn', null);

