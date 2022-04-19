const AddressService = require('../services/address.service')
const { handleError } = require('../services/httpResponse.service')

module.exports = {
    insert: async (req, res) => {
        try {
            await AddressService.insert(req.body)
            return res.status(200).json('insert success')
        } catch (e) {
            handleError(e, res)
        }
    },
}
