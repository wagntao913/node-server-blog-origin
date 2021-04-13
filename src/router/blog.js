const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')

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
        req.body.author = 'zhangsan'
        console.log(req.body)
        const result = newBlog(req.body)
        return result.then(blogData => {
            return new SuccessModel(blogData)
        })
    }

    // 更新blog
    if(method === 'POST' && req.path === '/api/blog/update') {
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
        const author = 'zhangsan'
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