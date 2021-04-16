const querystring = require('querystring')

const handlerUserRouter = require('./src/router/user')
const handlerBlogRouter = require('./src/router/blog')
const { set, get } = require('./src/db/redis')

const getPostData = (req) => {
    const promise = new Promise((reslove,reject) => {
        if(req.method !== 'POST') {
            reslove({})
            return
        }
        if(req.headers['content-type'] !== 'application/json'){
            reslove({})
            return
        }
        let postData = ''
        req.on('data',chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if(!postData){
                reslove({})
                return
            }
            reslove(JSON.parse(postData))
        })
    })
    return promise
}

const serverHandler = (req, res) => {
    res.setHeader('Content-type', 'application/json')
    const url = req.url
    req.path = url.split('?')[0]

    // 解析query参数
    req.query = querystring.parse(url.split('?')[1])

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if(!item) return
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    });

    // 解析session
    let needSetCookie = false
    let userId = req.cookie.userid
    if(!userId){
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        // 初始化 redis 中的 session 值
        set(userId,{})
    }
    // 获取session
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if(sessionData === null) {
            // 初始化 redis 中的 session 值
            set(req.sessionId, {})
            //  设置 session
            req.session = {}
        } else {
            //  设置 session
            req.session = sessionData
        }
        return getPostData(req)
    }).then(postData => {
        req.body = postData
        // 处理 blog 路由
        const blogResult = handlerBlogRouter(req,res)
        if(blogResult){
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData))
            })
            return
        }
    
        // 处理 user 路由
        const userResult = handlerUserRouter(req,res)
        if(userResult){
            userResult.then((userData) => {
                res.end(JSON.stringify(userData))
            })
            return
        }
    
        // 处理 404
        res.writeHead(404,{'Content-type':'text/plain'})
        res.write('404 NOT Found\n')
        res.end()
    })

}

module.exports = serverHandler