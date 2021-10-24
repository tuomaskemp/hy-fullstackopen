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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}