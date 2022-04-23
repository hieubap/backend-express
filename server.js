require('dotenv').config();
const express = require('express');
const db = require('./app/models/index.model');
const { allAppRoute } = require('./app/routes/index.route');

const app = express();
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
allAppRoute(app);

const httpServer = require('http').createServer(app);
let PORT;
process.env.STATUS === 'production' ? (PORT = process.env.PROD_PORT || 3001) : (PORT = process.env.DEV_PORT || 3001);

httpServer.listen(PORT, () => {
	console.log(`Server in ${process.env.STATUS} mode, listening on port:${PORT}`);
});
// db.sync();
