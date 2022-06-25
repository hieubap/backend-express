/* Replace with your SQL commands */
delete from airsense.permission;
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (1, 'CREATE_CUSTOMER', '2022-06-01 21:30:39', '2022-06-01 21:30:39', null, 'tạo khách hàng', 19);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (3, 'UPDATE_CUSTOMER', '2022-06-01 21:30:39', '2022-06-01 21:30:39', null, 'cập nhật khách hàng', 19);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (4, 'DELETE_CUSTOMER', '2022-06-01 21:30:39', '2022-06-01 21:30:39', null, 'xóa hoạt động khách hàng', 19);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (5, 'DETAIL_CUSTOMER', '2022-06-01 21:30:39', '2022-06-01 21:30:39', null, 'xem thông tin khách hàng', 19);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (6, 'SEARCH_CUSTOMER', '2022-06-01 21:30:39', '2022-06-01 21:30:39', null, 'tìm kiếm thông tin khách hàng', 19);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (7, 'CREATE_MANIFEST', '2022-06-01 21:30:39', '2022-06-01 21:30:39', null, 'tạo quyền hạn', 44);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (8, 'UPDATE_MANIFEST', '2022-06-01 21:30:39', '2022-06-01 21:30:39', null, 'cập nhật quyền hạn', 44);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (12, 'SEARCH_MANIFEST', '2022-06-01 21:30:40', '2022-06-01 21:30:40', null, 'tìm kiếm quyền hạn', 44);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (13, 'DELETE_MANIFEST', '2022-06-01 21:30:40', '2022-06-01 21:30:40', null, 'xóa quyền hạn', 44);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (14, 'DETAIL_MANIFEST', '2022-06-01 21:30:40', '2022-06-01 21:30:40', null, 'chi tiết quyền hạn', 44);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (15, 'MANAGE_ADMIN', '2022-06-01 21:30:40', '2022-06-01 21:30:40', null, 'Quản lý quản trị viên', null);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (19, 'MANAGE_CUSTOMER', '2022-06-01 21:30:40', '2022-06-01 21:30:40', null, 'Quản lý khách hàng', null);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (20, 'CREATE_ADMIN', '2022-06-01 21:30:40', '2022-06-01 21:30:40', null, 'tạo nhà quản trị', 15);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (21, 'UPDATE_ADMIN', '2022-06-01 21:30:40', '2022-06-01 21:30:40', null, 'cập nhật nhà quản trị', 15);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (22, 'DELETE_ADMIN', '2022-06-01 21:30:40', '2022-06-01 21:30:40', null, 'xóa hoạt động nhà quản trị', 15);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (23, 'DETAIL_ADMIN', '2022-06-01 21:30:40', '2022-06-01 21:30:40', null, 'xem thông tin nhà quản trị', 15);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (24, 'SEARCH_ADMIN', '2022-06-01 21:30:40', '2022-06-01 21:30:40', null, 'tìm kiếm thông tin nhà quản trị', 15);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (25, 'ACTIVE_CUSTOMER', '2022-06-04 12:31:10', '2022-06-04 12:31:10', null, 'bật tắt hoạt động tài khoản khách hàng', 19);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (26, 'ACTIVE_ADMIN', '2022-06-04 12:31:10', '2022-06-04 12:31:10', null, 'bật tắt hoạt động tài khoản quản trị viên', 15);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (27, 'ACTIVE_MANIFEST', '2022-06-04 12:31:10', '2022-06-04 12:31:10', null, 'bật tắt hoạt động quyền hạn', 44);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (28, 'CREATE_LOCATION', '2022-06-11 22:26:43', '2022-06-11 22:26:43', null, 'tạo trạm quan trắc', 45);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (29, 'UPDATE_LOCATION', '2022-06-11 22:26:43', '2022-06-11 22:26:43', null, 'cập nhật trạm quan trắc', 45);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (30, 'DETAIL_LOCATION', '2022-06-11 22:26:43', '2022-06-11 22:26:43', null, 'chi tiết trạm quan trắc', 45);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (31, 'DELETE_LOCATION', '2022-06-11 22:26:43', '2022-06-11 22:26:43', null, 'xóa trạm quan trắc', 45);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (32, 'SEARCH_LOCATION', '2022-06-11 22:26:43', '2022-06-11 22:26:43', null, 'tìm kiếm trạm quan trắc', 45);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (33, 'VIEW_AQI_LOCATION', '2022-06-11 22:26:43', '2022-06-11 22:26:43', null, 'xem chỉ số Aqi trạm quan trắc', 45);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (34, 'RECEIVE_EMAIL_AQI_OF_LOCATION', '2022-06-11 22:26:43', '2022-06-11 22:26:43', null, 'nhận email thông báo aqi của trạm quan trắc', 45);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (35, 'VIEW_OTHER_DATA_GRAPH', '2022-06-11 22:26:43', '2022-06-11 22:26:43', null, 'xem các loại biểu đồ khác', 45);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (36, 'CHANGE_STATUS_LOCATION', '2022-06-11 22:26:43', '2022-06-11 22:26:43', null, 'cập nhật trạng thái trạm quan trắc', 45);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (37, 'UPDATE_SENSOR_DEVICE', '2022-06-11 22:26:43', '2022-06-11 22:26:43', null, 'cập nhật thiết bị', 46);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (38, 'DELETE_SENSOR_DEVICE', '2022-06-11 22:26:43', '2022-06-11 22:26:43', null, 'xóa thiết bị', 46);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (39, 'DETAIL_SENSOR_DEVICE', '2022-06-11 22:26:43', '2022-06-11 22:26:43', null, 'chi tiết thiết bị', 46);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (40, 'SEARCH_SENSOR_DEVICE', '2022-06-11 22:26:43', '2022-06-11 22:26:43', null, 'tìm kiếm thiết bị', 46);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (41, 'ACTIVE_SENSOR_DEVICE', '2022-06-11 22:26:43', '2022-06-11 22:26:43', null, 'bật tắt hoạt động của thiết bị', 46);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (42, 'CHANGE_TIME_STEP_DEVICE', '2022-06-11 22:26:43', '2022-06-11 22:26:43', null, 'thay đổi thời gian gửi số liệu của thiết bị', 46);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (43, 'CREATE_SENSOR_DEVICE', '2022-06-11 22:26:43', '2022-06-11 22:26:43', null, 'tạo thiết bị', 46);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (44, 'MANAGE_MANIFEST', '2022-06-25 21:39:14', '2022-06-25 21:39:14', null, 'quản lý phân quyền', null);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (45, 'MANAGE_LOCATION', '2022-06-25 21:40:13', '2022-06-25 21:40:13', null, 'quản lý trạm quan trắc', null);
INSERT INTO airsense.permission (id, name, created_at, updated_at, deleted_at, vi_name, parent_id) VALUES (46, 'MANAGE_SENSOR', '2022-06-25 21:41:17', '2022-06-25 21:41:17', null, 'quản lý thiết bị', null);
