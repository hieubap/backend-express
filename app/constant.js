const messageConst = {
	INSERT_SUCCESS: 'Thêm đối tượng thành công',
	INSERT_FAIL: 'Thêm đối tượng thất bại',
	BATCH_INSERT_SUCCESS: 'Thêm danh sách đối tượng thành công',
	BATCH_INSERT_FAIL: 'Thêm danh sách đối tượng thất bại',
	UPDATE_SUCCESS: 'Cập nhật đối tượng thành công',
	UPDATE_FAIL: 'Cập nhật đối tượng thất bại',
	DELETE_SUCCESS: 'Xóa đối tượng thành công',
	DELETE_FAIL: 'Xóa đối tượng thất bại',
	NO_AUTHORIZE: 'Không có quyền truy cập tài nguyên',
	NOT_FOUND: 'Tài nguyên không tồn tại',
	TIMEOUT: 'Máy chủ phản hồi quá lâu , vui lòng thử lại sau ',
	SERVER_ERROR: 'Máy chủ xảy ra lỗi , vui lòng thử lại sau',
	PARAMS_NUMBER_REQUIRED: 'Tham số không đúng định dạng ',
	TOKEN_INVALID: 'Token không chính xác',
	TOKEN_EXPIRE: 'Token hết hạn',
	PERMISSION_DENIED: 'không có quyền truy cập tài nguyên',
	BAD_CRIDENTAL: 'Thông tin đăng nhập không chính xác',
	PASSWORD_WRONG: 'Mật khẩu không chính xác',
	UPDATE_PASSWORD_SUCCESS: 'Cập nhật mật khẩu thành công',
	BAD_PARAMETER: 'Tham số không đúng',
	RESET_PASSWORD_SUCCESS: 'Vui lòng kiểm tra email và làm theo hướng dẫn',
	PAGE_START_FROM_ONE: 'Phân trang bắt đầu từ page 1',
	NOT_EXIST_ENUM: 'Mã code không hợp lệ',
	REF_NOT_FOUND: 'Reference id không tồn tại',
};
const errorCode = {
	SQLIZE_VALIDATION_ERROR: 'SequelizeValidationError',
	SQLIZE_DB_NAME_ERROR: 'SequelizeDatabaseError',
	SQLIZE_UNIQUE_CONSTRAINT_ERROR: 'SequelizeUniqueConstraintError',
};
const statusCode = {
	SUCCESS_CODE: 200,
	CREATED_CODE: 201,
	DELETED_CODE: 202,
	SERVER_ERROR_CODE: 500,
	BAD_REQUEST_CODE: 400,
	NOT_FOUND_CODE: 404,
	NOT_AUTHEN_CODE: 401,
	NOT_AUTHOR_CODE: 403,
};
const functionReturnCode = {
	CATCH_ERROR: -1,
	VOID: 0,
	SUCCESS: 1,
	EXPIRED: -2,
	NOT_FOUND: -3,
	REF_NOT_FOUND: -4,
	PARAM_REQUIRED: (name) => name,
};
const appUserTypeConst = {
	admin: 1,
	teacher: 2,
	blogger: 3,
	customer: 4,
	sensorOwner: 5,
};
const appPermissionConst = {
	// quản lý customer
	CREATE_CUSTOMER: 'CREATE_CUSTOMER',
	UPDATE_CUSTOMER: 'UPDATE_CUSTOMER',
	DETAIL_CUSTOMER: 'DETAIL_CUSTOMER',
	DELETE_CUSTOMER: 'DELETE_CUSTOMER',
	SEARCH_CUSTOMER: 'SEARCH_CUSTOMER',
	ACTIVE_CUSTOMER: 'ACTIVE_CUSTOMER',
	// quản lý admin
	CREATE_ADMIN: 'CREATE_ADMIN',
	UPDATE_ADMIN: 'UPDATE_ADMIN',
	DETAIL_ADMIN: 'DETAIL_ADMIN',
	DELETE_ADMIN: 'DELETE_ADMIN',
	SEARCH_ADMIN: 'SEARCH_ADMIN',
	ACTIVE_ADMIN: 'ACTIVE_ADMIN',
	// quản lý phân quyền
	CREATE_MANIFEST: 'CREATE_MANIFEST',
	UPDATE_MANIFEST: 'UPDATE_MANIFEST',
	SEARCH_MANIFEST: 'SEARCH_MANIFEST',
	DETAIL_MANIFEST: 'DETAIL_MANIFEST',
	DELETE_MANIFEST: 'DELETE_MANIFEST',
	ACTIVE_MANIFEST: 'ACTIVE_MANIFEST',
	// quản lý trạm quan trắc
	CREATE_LOCATION: 'CREATE_LOCATION',
	UPDATE_LOCATION: 'UPDATE_LOCATION',
	DETAIL_LOCATION: 'DETAIL_LOCATION',
	DELETE_LOCATION: 'DELETE_LOCATION',
	SEARCH_LOCATION: 'SEARCH_LOCATION',
	VIEW_AQI_LOCATION: 'VIEW_AQI_LOCATION',
	RECEIVE_EMAIL_AQI_OF_LOCATION: 'RECEIVE_EMAIL_AQI_OF_LOCATION',
	VIEW_OTHER_DATA_GRAPH: 'VIEW_OTHER_DATA_GRAPH',
	CHANGE_STATUS_LOCATION: 'CHANGE_STATUS_LOCATION',
	// quản lý thiết bị sensor
	UPDATE_SENSOR_DEVICE: 'UPDATE_SENSOR_DEVICE',
	DELETE_SENSOR_DEVICE: 'DELETE_SENSOR_DEVICE',
	DETAIL_SENSOR_DEVICE: 'DETAIL_SENSOR_DEVICE',
	SEARCH_SENSOR_DEVICE: 'SEARCH_SENSOR_DEVICE',
	ACTIVE_SENSOR_DEVICE: 'ACTIVE_SENSOR_DEVICE',
	CHANGE_TIME_STEP_DEVICE: 'CHANGE_TIME_STEP_DEVICE',
	CREATE_SENSOR_DEVICE: 'CREATE_SENSOR_DEVICE',
};
const locationStatus = {
	TESTING: 1,
	ACTIVE: 2,
	DE_ACTIVE: 3,
};

Object.freeze(messageConst);
Object.freeze(errorCode);
Object.freeze(statusCode);
Object.freeze(functionReturnCode);
Object.freeze(appUserTypeConst);
Object.freeze(appPermissionConst);
Object.freeze(locationStatus);

module.exports = {
	messageConst,
	errorCode,
	statusCode,
	functionReturnCode,
	appUserTypeConst,
	appPermissionConst,
	locationStatus,
};
