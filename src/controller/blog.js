const getList = (keyword,author) => {
    return [
        {
            title: '博客A',
            content: '内容A',
            author: '作者A',
            createTime: '1617951468214'
        },
        {
            title: '博客B',
            content: '内容B',
            author: '作者B',
            createTime: '1617951468264'
        },
        {
            title: '博客C',
            content: '内容C',
            author: '作者C',
            createTime: '1617951469214'
        }
    ]
}

const getDetail = (id) => {
    return {
        idL:1,
        title: '博客A',
        content: '内容A',
        author: '作者A',
        createTime: '1617951468214'
    }
}

const newBlog = (blogData = {}) => {
    return {
        id: 3
    }
}

const updateBlog = (id, blogData = {}) => {
    return true
}

const deleteBlog = (id) => {
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}