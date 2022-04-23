const addressService = require('../services/address.service');
const { handleError } = require('../services/httpResponse.service');
const BaseController = require('./base.controller');

class AddressController extends BaseController {
	constructor() {
		super(addressService);
	}
}
module.exports = new AddressController();
