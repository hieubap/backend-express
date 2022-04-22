const { Address } = require('../models/index.model')
const BaseService = require('./base.service')


class AddressService extends BaseService{
    constructor() {
        super(Address);
    }

    // more query
}
module.exports= new AddressService()