const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')

// 统一登录验证函数
const loginCheck = (req) => {
    if(!req.session.username) {
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
}

const handlerBlogRouter = (req,res) => {
    const method = req.method
    const id= req.query.id

    // 获取blog列表
    if(method === 'GET' && req.path === '/api/blog/list') {
        const keyword = req.query.keyword || ''
        const author = req.query.author || ''
        const result = getList(keyword,author)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取blog详情
    if(method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then(detail => {
            return new SuccessModel(detail)
        })
    }

    // 新建blog
    if(method === 'POST' && req.path === '/api/blog/new') {
        console.log(req.session)
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheckResult
        }
        req.body.author = req.session.username
        const result = newBlog(req.body)
        return result.then(blogData => {
            return new SuccessModel(blogData)
        })
    }

    // 更新blog
    if(method === 'POST' && req.path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheckResult
        }
        const result = updateBlog(id, req.body)
        return result.then((updateDate) => {
            if(updateDate) {
                return new SuccessModel()
            }else {
                return new ErrorModel('更新失败')
            }
        })
    }

    // 删除 blog
    if(method === 'POST' && req.path === '/api/blog/delete') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheckResult
        }

        const author = req.session.username
        const result = deleteBlog(id, author)
        return result.then((delDate) => {
            if(delDate) {
                return new SuccessModel()
            }else {
                return new ErrorModel('删除失败')
            }
        })
    }
}

module.exports = handlerBlogRouter