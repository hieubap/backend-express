const constantObject = {
    SQLIZE_VALIDATION_ERROR : 'SequelizeValidationError',
    SQLIZE_DB_NAME_ERROR : 'SequelizeDatabaseError',
    INSERT_SUCCESS : 'Thêm đối tượng thành công',
    INSERT_FAIL : 'Thêm đối tượng thất bại',
    BATCH_INSERT_SUCCESS : 'Thêm danh sách đối tượng thành công',
    BATCH_INSERT_FAIL : 'Thêm danh sách đối tượng thất bại',
    UPDATE_SUCCESS : 'Cập nhật đối tượng thành công',
    UPDATE_FAIL : 'Cập nhật đối tượng thất bại',
    DELETE_SUCCESS : 'Xóa đối tượng thành công',
    DELETE_FAIL : 'Xóa đối tượng thất bại',
    NO_AUTHORIZE : 'Không có quyền truy cập tài nguyên',
    NOT_FOUND : 'Tài nguyên không tồn tại',
    TIMEOUT : 'Máy chủ phản hồi quá lâu , vui lòng thử lại sau ',
    SERVER_ERROR : 'Máy chủ xảy ra lỗi , vui lòng thử lại sau',
    PARAMS_NUMBER_REQUIRED : 'Tham số không đúng định dạng ',
    
}

Object.freeze(constantObject)
module.exports = constantObject