const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(() => {response.status(400).json({ error: 'title and url missing' })})
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        response.status(404).json({ error: exception })
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
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.status(201).json(updatedBlog)
    } catch (exception) {
        response.status(400).json({ error: 'update failed' })
    }
})

module.exports = blogsRouter