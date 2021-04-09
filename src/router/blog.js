const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')

const handlerBlogRouter = (req,res) => {
    const method = req.method
    const id= req.query.id

    // 获取blog列表
    if(method === 'GET' && req.path === '/api/blog/list') {
        const keyword = req.query.keyword || ''
        const author = req.query.author || ''
        const resData = getList(keyword,author)
        return new SuccessModel(resData)
    }

    // 获取blog详情
    if(method === 'GET' && req.path === '/api/blog/detail') {
        
        const resData = getDetail(id)
        return new SuccessModel(resData)
    }

    // 新建blog
    if(method === 'POST' && req.path === '/api/blog/new') {
        const blogData = newBlog(req.body)
        return new SuccessModel(blogData)
    }

    // 更新blog
    if(method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        if(result) {
            return new SuccessModel()
        }else {
            return new ErrorModel('更新失败')
        }
    }

    // 删除 blog
    if(method === 'POST' && req.path === '/api/blog/delete') {
        const result = deleteBlog(id)
        if(result) {
            return new SuccessModel()
        }else {
            return new ErrorModel('删除失败')
        }
    }
}

module.exports = handlerBlogRouter