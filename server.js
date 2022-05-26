require('dotenv').config();
const express = require('express');
const { allAppRoute } = require('./app/routes/index.route');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
allAppRoute(app);

const httpServer = require('http').createServer(app);

httpServer.listen(process.env.PORT || 3001, () => {
	console.log(`Server in ${process.env.STATUS} mode, listening on port:${process.env.PORT}`);
});
// db.sync({alter : true});
