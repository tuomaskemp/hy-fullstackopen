const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

describe('user api', () => {
    test('can create user', async () => {
        const res = await api.post('/api/users').send(helper.testUser)
        expect(res.body.username).toBe('Test3')
    })
    test('invalid user returns correct status code', async () => {
        await api
            .post('/api/users')
            .send(helper.invalidUser)
            .expect(401)
    })
    test('if created user is invalid error message is retured', async () => {
        const res = await api.post('/api/users').send(helper.invalidUser)
        expect(res.error).toBeDefined()
    })
})

afterAll(() => {
    mongoose.connection.close()
})