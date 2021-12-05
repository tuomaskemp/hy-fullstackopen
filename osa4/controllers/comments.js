const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/', async (request, response) => {
    const comments = await Comment.find({})
    response.json(comments)
})

commentsRouter.post('/', async (request, response) => {
    const body = request.body
    const blog = await Blog.findById(body.blog)

    const comment = new Comment({
        content: body.content,
        blog: body.blog
    })
    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    const populatedBlog = await Comment.findById(savedComment._id)
    response.status(201).json(populatedBlog)
})

module.exports = commentsRouter