class BaseController{
    constructor(Service , req , res) {
        this.req = req
        this.res = res
        this.service = Service
    }
    search(){

    }
    detail(){}
    create(){}
    update(){}
    delete(){}
}
module.exports = BaseController