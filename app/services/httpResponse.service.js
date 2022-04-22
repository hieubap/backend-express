const constantObject = require("../assets/constant")

module.exports = {
    handleError : (error , res)=>{
        if(error.name === constantObject.SQLIZE_VALIDATION_ERROR){
            return res.status(400).json({
                error: error.errors.map((el) => ({ [el.path]: el.message })),
            })
        }
        // more if block code 
    } 
}