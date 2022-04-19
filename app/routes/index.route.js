// import addressRouter from "./address.route";

const addressRouter = require('./address.route')

const allAppRoute = (app) => {
    app.use('/address', addressRouter)
    
}

module.exports = {allAppRoute}

