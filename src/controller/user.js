const { exec, escape } = require("../db/mysql")
const { genPassword } = require("../utils/cryp")

const login = (username,password)=> {
    // 密码加密
    password = genPassword(password)
    let sql = `select username,realname from users where username =${escape(username)} and password=${escape(password)}`
    return exec(sql).then(rows => { return rows[0] || {} })
}

module.exports = {
    login
}