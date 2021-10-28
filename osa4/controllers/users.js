const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body
    const passwordInBody = body.password === undefined ? false : true
    const validPassword = (passwordInBody && body.password?.length > 3) ? true : false

    if (!validPassword) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        fullname: body.fullname,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(users.map(u => u.toJSON()))
})

usersRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = usersRouter