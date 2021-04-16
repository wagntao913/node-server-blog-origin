const env = process.env.NODE_ENV

let MYSQL_CONF
let REDIS_CONF

if(env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'wangtao4593',
        post: '3306',
        database: 'myblog'
    }

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
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

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}