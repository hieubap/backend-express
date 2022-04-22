const addressService = require('../services/address.service')
const { handleError } = require('../services/httpResponse.service')
const BaseController = require('./base.controller')
/*
module.exports = {
    insert: async (req, res) => {
        try {
            // await addressService.insert({address : 'hn' , location : 'viet nam'})
            await addressService.insert(req.body)
            return res.status(200).json('insert success')
        } catch (e) {
            handleError(e, res)
        }
    },
}*/

class AddressController extends BaseController{
    constructor(req , res) {
        super(addressService , req , res);
    }

}
module.exports = AddressController
