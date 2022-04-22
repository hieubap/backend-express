const express = require('express')
const addressRouter = express.Router()
const AddressController = require('../controllers/address.controller')
const BaseRouter = require('./base.router')

// middleware that is specific to this router
class AddressRoute extends BaseRouter {
    constructor() {
        super(AddressController);

    }
    // write more route with format iife fuctunc here
}


module.exports = new AddressRoute()
