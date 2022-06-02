// import addressRouter from "./address.route";
const userRouter = require('./user.route');
const manifestRouter = require('./manifest.route');
const permissionRouter = require('./permission.route');
const userTypeRouter = require('./userType.route');
const { appUserTypeConst, appPermissionConst } = require('../constant');
const userAdminRouterRaw = require('express').Router();
const userCustomerRouterRaw = require('express').Router();

const userAdminRouter = require('./admin.route')(userAdminRouterRaw, {
	insert: {
		permission: appPermissionConst.CREATE_ADMIN,
		userType: appUserTypeConst.admin,
	},
	update: {
		permission: appPermissionConst.UPDATE_ADMIN,
		userType: appUserTypeConst.admin,
	},
	toggleActive: {
		permission: appPermissionConst.ACTIVE_ADMIN,
		userType: appUserTypeConst.admin,
	},
	delete: {
		permission: appPermissionConst.DELETE_ADMIN,
		userType: appUserTypeConst.admin,
	},
	detail: {
		permission: appPermissionConst.DETAIL_ADMIN,
		userType: appUserTypeConst.admin,
	},
	search: {
		permission: appPermissionConst.SEARCH_ADMIN,
		userType: appUserTypeConst.admin,
	},
});
const userCustomerRoute = require('./admin.route')(userCustomerRouterRaw, {
	insert: {
		permission: appPermissionConst.CREATE_CUSTOMER,
		userType: appUserTypeConst.customer,
	},
	update: {
		permission: appPermissionConst.UPDATE_CUSTOMER,
		userType: appUserTypeConst.customer,
	},
	toggleActive: {
		permission: appPermissionConst.ACTIVE_CUSTOMER,
		userType: appUserTypeConst.admin,
	},
	delete: {
		permission: appPermissionConst.DELETE_CUSTOMER,
		userType: appUserTypeConst.customer,
	},
	detail: {
		permission: appPermissionConst.DETAIL_CUSTOMER,
		userType: appUserTypeConst.customer,
	},
	search: {
		permission: appPermissionConst.SEARCH_CUSTOMER,
		userType: appUserTypeConst.customer,
	},
});

const allAppRoute = (app) => {
	app.use('/admin', userAdminRouter);
	app.use('/customer', userCustomerRoute);
	app.use('/app-userType', userTypeRouter);
	app.use('/user', userRouter);
	app.use('/manifest', manifestRouter);
	app.use('/permission', permissionRouter);
};

module.exports = { allAppRoute };
