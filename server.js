require('dotenv').config();
const express = require('express');
const { allAppRoute } = require('./app/routes/index.route');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const initFirebaseController = require('./app/common/firebase/base.controller');

app.use(cors());
app.use(express.json());

initFirebaseController(app);

const httpServer = require('http').createServer(app);

httpServer.listen(process.env.PORT || 3001, () => {
	console.log(`Server in ${process.env.STATUS} mode, listening on port:${process.env.PORT}`);
});
