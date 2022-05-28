// import addressRouter from "./address.route";

const userRouter = require('./user.route');
const manifestRouter = require('./manifest.route');

const allAppRoute = (app) => {
	app.use('/user', userRouter);
	app.use('/manifest', manifestRouter);
};

module.exports = { allAppRoute };
