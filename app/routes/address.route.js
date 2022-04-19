const express = require('express')
const addressRouter = express.Router()
const AddressController = require('../controllers/address.controller')

// middleware that is specific to this router
addressRouter.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
addressRouter.get('/', (req, res) => {
    res.send('hello')
})
addressRouter.post('/insert', async (req, res) => {
    AddressController.insert(req , res)
})

module.exports = addressRouter
