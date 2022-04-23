// import addressRouter from "./address.route";

const addressRouter = require('./address.route');
const userRouter = require('./user.route');

const allAppRoute = (app) => {
	app.use('/address', addressRouter);
	app.use('/user', userRouter);
};

module.exports = { allAppRoute };
