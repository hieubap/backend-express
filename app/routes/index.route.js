// import addressRouter from "./address.route";

const addressRouter = require('./address.route');
const userRouter = require('./user.route');
const manifestRouter = require('./manifest.route');
const permissionRouter = require('./permission.route');

const allAppRoute = (app) => {
	app.use('/address', addressRouter);
	app.use('/user', userRouter);
	app.use('/manifest', manifestRouter);
  app.use('/permission', permissionRouter);
};

module.exports = { allAppRoute };
