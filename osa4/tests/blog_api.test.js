const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('api', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('returns the correct amount of blogs in JSON-format', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    test('response blog identifier field name is id', async () => {
        const response = await api.get('/api/blogs')
        console.log(response.body[0])
        expect(response.body[0].id).toBeDefined()
    })
})

afterAll(() => {
    mongoose.connection.close()
})