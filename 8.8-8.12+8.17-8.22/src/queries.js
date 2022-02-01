import { gql } from '@apollo/client'

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
			title
			author {
				name
			}
			published
			genres
		}
	}
`

export const RECOMMENDED_BOOKS = gql`
	query {
		userGenreBooks {
			title
			author {
				name
			}
			published
			genres
		}
		me {
			favoriteGenre
		}
	}
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
		) { title }
	}
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