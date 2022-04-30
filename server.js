require('dotenv').config();
const express = require('express');
const { allAppRoute } = require('./app/routes/index.route');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));
allAppRoute(app);

const httpServer = require('http').createServer(app);
let PORT;
process.env.NODE_ENV === 'production' ? (PORT = process.env.PROD_PORT || 3001) : (PORT = process.env.DEV_PORT || 3001);

httpServer.listen(PORT, () => {
	console.log(`Server in ${process.env.NODE_ENV} mode, listening on port:${PORT}`);
});

// db.sync({alter : true});
