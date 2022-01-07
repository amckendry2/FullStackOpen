const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialPosts = [
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

beforeEach( async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialPosts)
})

describe('get blogs', () => {
    test('gets correct number of posts', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(5)
    })

    test('has id property', async () => {
        const res = await api.get('/api/blogs')
        for(const post of res.body){
            expect(post.id).toBeDefined()
        }
    })
})

describe('post blogs', () => {
    const newPost = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    }  

    test('posting new blog sends correct data', async () => {
        const res = await api
            .post('/api/blogs')
            .send(newPost)
        expect(res.body).toEqual({
            ...res.body,
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
        })
    })

    test('posting new blog increases stored blogs by 1', async () => {
        await api
            .post('/api/blogs')
            .send(newPost)
        const newData = await api.get('/api/blogs')
        expect(newData.body).toHaveLength(initialPosts.length + 1)
    })


    const newPostNoLikes = {
        title: "test title",
        author: "test author",
        url: "www.blogpost.com"
    }

    test('if likes are not specified, zero is default', async () => {
        const res = await api
            .post('/api/blogs')
            .send(newPostNoLikes)
        expect(res.body.likes).toBe(0)
    })
})

describe('put blogs', () => {
    test('able to correctly update likes', async () => {
        const res = await api
            .put('/api/blogs/5a422b891b54a676234d17fa')
            .send({likes: 69})
        expect(res.body.likes).toBe(69)
    })
})

describe('delete blogs', () => {
    test('receive status 204 and data length decreased by 1 after deleting by id', async () => {
        const res = await api
            .delete('/api/blogs/5a422b891b54a676234d17fa')
        expect(res.status).toBe(204)
        const newData = await api.get('/api/blogs')
        expect(newData.body).toHaveLength(initialPosts.length - 1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})

