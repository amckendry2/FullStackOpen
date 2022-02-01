import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		published
		genres
		author {
			name
		}
	}
`

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails	
		}
	}
	${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`

export const ALL_BOOKS = gql`
	query {
		allBooks {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const RECOMMENDED_BOOKS = gql`
	query {
		userGenreBooks {
			...BookDetails
		}
		me {
			favoriteGenre
		}
	}
	${BOOK_DETAILS}
`

export const GENRE_BOOKS = gql`
	query genreBooks(
		$author: String!,
		$genre: String!
	) {
		genreBooks(
			genre: $genre
		) {
			title
			author {
				name
			}
			published
		}
	}
`

export const ADD_BOOK = gql`
	mutation addBook(
		$title: String!, 
		$author: String!, 
		$published: Int!,
		$genres: [String!]! 
	) {
		addBook(
			title: $title,
			author: $author,
			published: $published,
			genres: $genres
		) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
	mutation editAuthor(
		$name: String!
		$born: Int!
	) {
		editAuthor(
			name: $name
			born: $born
		) {
			name
			born
		}
	}
`

export const LOGIN_USER = gql`
	mutation loginUser(
		$username: String!
		$password: String!
	) {
		login(
			username: $username
			password: $password
		) {
			value
		}
	}
`