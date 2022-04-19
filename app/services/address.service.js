const { Address } = require('../models/index.model')

module.exports = {
    insert: async (address) => {
        await Address.create(address)
    },
}