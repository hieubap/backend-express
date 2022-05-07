const ManifestController = require('../controllers/manifest.controller');
const manifestRoute = require('express').Router();

const router = require('./base.route')(manifestRoute, ManifestController);
// more router here
manifestRoute.post('/addPermission', (req, res, next) => ManifestController.addPermission(req, res, next));
module.exports = router;
