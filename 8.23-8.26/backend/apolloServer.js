const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { execute, subscribe } = require('graphql')

const http = require('http')

const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const JWT_SECRET = process.env.JWT_SECRET

module.exports = async function startApolloServer(typeDefs, resolvers) {
	const app = express()
	const httpServer = http.createServer(app)

	const schema = makeExecutableSchema({ typeDefs, resolvers })


	const subscriptionServer = SubscriptionServer.create({
		schema,
		execute,
		subscribe
	}, {
		server: httpServer,
		path: '/graphql'
	})

	const server = new ApolloServer({
		schema,
		context: async ({ req }) => {
			let currentUser = null
			const auth = req ? req.headers.authorization : null
			if (auth && auth.toLowerCase().startsWith('bearer ')) {
				const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
				currentUser = await User.findById(decodedToken.id)
				return { currentUser }
			}
		},
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart(){
					return {
						async drainServer(){
							subscriptionServer.close()
						}
					}
				}
			}
		]
	})

	await server.start()
	server.applyMiddleware({
		app,
		path: '/'
	})

	await new Promise(res => httpServer.listen({ port: 4000 }, res))
	console.log(`server listening on port 4000${server.graphqlPath}`)
}
