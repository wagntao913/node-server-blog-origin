const querystring = require('querystring')

const handlerUserRouter = require('./src/router/user')
const handlerBlogRouter = require('./src/router/blog')

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
        const key = arr[0]
        const val = arr[1]
        req.cookie[key] = val
    });

    // 处理 postData
    getPostData(req).then(postData => {
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