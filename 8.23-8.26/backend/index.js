require('dotenv').config()
const startApolloServer = require('./apolloServer')
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')

const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI 

console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((err) => {
		console.log('error connecting to MonboDB', err.message)
	})


startApolloServer(typeDefs, resolvers)
// apolloServer.listen().then(({ url }) => {
// 	console.log(`Server ready at ${url}`)
// })
