const { UserInputError, AuthenticationError } = require('apollo-server-express')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const pubsub = new PubSub()

const JWT_SECRET = process.env.JWT_SECRET

const resolvers = {
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
		}
	},
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
			const foundBooks = await Book.find({ query }).populate('author')
			return foundBooks 
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
			const retBook = await newBook.populate('author')
			pubsub.publish('BOOK_ADDED', { bookAdded: retBook })

			return retBook
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

module.exports = resolvers