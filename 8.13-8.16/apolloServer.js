const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

const MONGODB_URI = process.env.MONGODB_URI 
const JWT_SECRET = process.env.JWT_SECRET

console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((err) => {
		console.log('error connecting to MonboDB', err.message)
	})


const typeDefs = gql`
	type Author {
		name: String!
		id: ID!
		born: Int
		bookCount: Int!	
	}
	type Book {
		title: String!
		published: Int!
		author: Author!
		id: ID!
		genres: [String!]!
	}
	type Query {
		bookCount: Int!
		authorCount: Int!	
		allBooks(author: String, genre: String): [Book!]
		userGenreBooks: [Book!]
		allAuthors: [Author!]
		me: User
	}
	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}
	type Token {
		value: String!
	}
	type Mutation {
		addBook(
			title: String!,
			author: String!,
			published: Int!,
			genres: [String!]!
		) : Book
		editAuthor(
			name: String!,
			born: Int!
		) : Author
		createUser(
			username: String!
			favoriteGenre: String!
		): User
		login(username: String!, password: String!): Token
	}
`

const resolvers = {
	Query: {
		bookCount: () => Book.collection.countDocuments(), 
		authorCount: () => Author.collection.countDocuments(),
		allBooks: async (obj, args) => { 
			let query = {}
			if(args.genre){
				query.genres = args.genre
			}
			if(args.author){
				const queriedAuthor = await Author.findOne({ name: args.author })
				if(queriedAuthor){ 
					query.author = queriedAuthor.id
				}
			}
			return Book.find({ query }).populate('author')
		},
		userGenreBooks: async (obj, args, context) => {
			if(!context.currentUser){
				throw new AuthenticationError('must be logged in to get recommended books')
			}
			return Book
				.find({ genres: context.currentUser.favoriteGenre })
				.populate('author')
		},
		allAuthors: async () => await Author.find({}),
		me: (obj, args, context) => context.currentUser,
	},
	Author: {
		bookCount: async obj => Book.countDocuments({ author: obj.id })
	},
	Mutation: {
		addBook: async (obj, args, context) => {
			console.log(context)
			if(!context.currentUser){
				throw new AuthenticationError('must be logged in to add books')
			}
			let foundAuthor = await Author.findOne({ name: args.author })
			if(!foundAuthor){
				foundAuthor = new Author({ name: args.author })
				try{
					await foundAuthor.save()
				} catch(err) {
					throw new UserInputError(err.message, {
						invalidArgs: args
					})
				}
			}
			const newBook = new Book({ ...args, author: foundAuthor.id })
			try{
			 await newBook.save()
			} catch (err) {
				throw new UserInputError(err.message, {
					invalidArgs: args
				})
			}
			return newBook.populate('author')
		},
		editAuthor: async (obj, args, context) => {
			if(!context.currentUser){
				throw new AuthenticationError('must be logged in to edit authors')
			}
			const foundAuthor = await Author.findOne({ name: args.name })
			foundAuthor.born = args.born
			return foundAuthor
				.save()
				.catch(err => {
					throw new UserInputError(err.message, {
						invalidArgs: args
					})
			})
		},
		createUser: async (obj, args) => {
			const newUser = new User({ ...args })
			return newUser
				.save()
				.catch(err => {
					throw new UserInputError(err.message, {
						invalidArgs: args
					})
				})
		},
		login: async (obj, args) => {
			const foundUser = await User.findOne({ username: args.username })	
			if(!foundUser || args.password !== 'password') {
				throw new UserInputError('wrong username or password')
			}
			const tokenObj = {
				username: foundUser.username,
				id: foundUser.id
			}
			return { value: jwt.sign(tokenObj, JWT_SECRET) }
		}
	}
}

module.exports = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		let currentUser = null
		const auth = req ? req.headers.authorization : null
		if(auth && auth.toLowerCase().startsWith('bearer ')){
			const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
			currentUser = await User.findById(decodedToken.id)
			return { currentUser }
		}
	}
})
