const { gql } = require("apollo-server-express")

const typedefs = gql`
	type Subscription{
		bookAdded: Book!
	}
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
module.exports = typedefs