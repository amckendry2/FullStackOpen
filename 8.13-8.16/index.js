require('dotenv').config()
const apolloServer = require('./apolloServer')

apolloServer.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
