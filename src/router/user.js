const { login } = require("../controller/user")
const { set } = require("../db/redis")
const { SuccessModel, ErrorModel } = require("../model/resModel")


const handlerUserRouter = (req,res) => {
    const method = req.method

    if(method === 'POST' && req.path === '/api/user/login') {
        const {username, password} = req.body
        const result= login(username,password)
        return result.then((data) =>{
            if(data.username){
                // 设置session
                req.session.username = data.username
                req.session.realname = data.realname
                // 同步 session 到 redis
                set(req.sessionId, req.session)

                return new SuccessModel
            }
            return new ErrorModel('用户名或密码错误')
        })
    }  
}

module.exports = handlerUserRouter