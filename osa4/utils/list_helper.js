const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, current) => acc + current.likes, 0)
}

const favoriteBlog = (blogs) => {
    const ascBlogs = blogs.sort((first, second) => first.likes - second.likes)
    return ascBlogs[ascBlogs.length - 1]
}

const mostBlogs = (blogs) => {
    const mostBlogs = lodash.groupBy(blogs, (item) => item.author)
    const result = []
    lodash.forIn(mostBlogs, function(value, key) {
        result.push({ author: key, blogs: value.length })
    })
    return lodash.maxBy(result, (item) => item.blogs)
}

const mostLikes = (blogs) => {
    const blogsByAuthor = lodash.groupBy(blogs, (item) => item.author)
    const result = []
    lodash.forIn(blogsByAuthor, (val, key) => {
        result.push({ author: key, likes: totalLikes(val) })
    })
    return lodash.maxBy(result, (item) => item.likes)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}