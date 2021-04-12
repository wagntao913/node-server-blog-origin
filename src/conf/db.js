const env = process.env.NODE_ENV

let MYSQL_CONF

if(env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'wangtao4593',
        post: '3306',
        database: 'myblog'
    }
}

if(env === 'pord') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '',
        post: '3306',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONF
}