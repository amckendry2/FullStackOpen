const express = require('express')
require('express-async-errors')

const blogsRouter  = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const authorsRouter = require('./controllers/authors')
const readingListsRouter = require('./controllers/readingLists')
const { unknownEndpoint, errorHandler, tokenExtractor } = require('./utils/middleware')

const { connectToDatabase } = require('./utils/db')
const { PORT } = require('./utils/config')

const app = express()

app.use(express.json())
app.use('/api/blogs', tokenExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', tokenExtractor, readingListsRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

const start = async () => {
	await connectToDatabase()
	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`)
	})
}

start()