const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate(
        'users', { username: 1, fullname: 1 })
    response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = await User.findById(request.user)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        users: user._id
    })
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog.users.toString() === request.user.toString()){
        await Blog.findByIdAndRemove(blog)
        response.status(204).end()
    } else {
        return response.status(401).json({ error: 'no permission to remove' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(201).json(updatedBlog)
})

module.exports = blogsRouter