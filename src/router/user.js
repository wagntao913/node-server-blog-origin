const { loginCheck } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")

const handlerUserRouter = (req,res) => {
    const method = req.method

    if(method === 'POST' && req.path === '/api/user/login') {
        console.log(req)
        const {username, password} = req.body
        const result= loginCheck(username,password)
        if(result){
            return new SuccessModel
        }else {
            return new ErrorModel('用户名或密码错误')
        }
    }
}

module.exports = handlerUserRouter