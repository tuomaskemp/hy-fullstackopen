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
        expect(response.body[0].id).toBeDefined()
    })
    test('can post a new blog', async () => {
        await api
            .post('/api/blogs')
            .send(helper.singleBlog)

        const currentBlogs = await helper.blogsInDb()
        expect(currentBlogs).toHaveLength(helper.initialBlogs.length + 1)
        const contents = currentBlogs.map(res => res.title)
        expect(contents).toContain('example blog')
    })
    test('a new blog has 0 likes if likes were not provided', async () => {
        const res = await api.post('/api/blogs').send(helper.singleBlogWithoutLikes)
        expect(res.body.likes).toBe(0)
    })
    test('blog without title and url is not added', async () => {
        await api
            .post('/api/blogs')
            .send(helper.singleBlogWithoutTitleAndUrl)
            .expect(400)

        const currentBlogs = await helper.blogsInDb()
        expect(currentBlogs).toHaveLength(helper.initialBlogs.length)

    })
})

afterAll(() => {
    mongoose.connection.close()
})