const express = require('express')
const baseRouter = express.Router()


// middleware that is specific to this router
/*addressRouter.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
*/
class BaseRouter {
    constructor(Controller ) {
        this.controller = Controller
        this.router = baseRouter
    }

    getDetail= (()=> {
        this.router.get('/detail', (req, res, next)=>{
            // forexample this.controller.detail()
        })
    })()

    search = (()=> {
        this.router.get('/search')
    })()

    create = (()=>{
    })()

    update = (()=>{
    })()

    delete = (()=> {
    })()
}
module.exports = BaseRouter

