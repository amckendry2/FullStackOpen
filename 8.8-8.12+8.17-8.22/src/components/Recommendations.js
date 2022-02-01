import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { RECOMMENDED_BOOKS } from '../queries'

const Recommendations = ({ show, loggedIn }) => {

	const [books, setBooks] = useState(null)
	const [genre, setGenre] = useState(null)
	const [getGenreBooks, genreBooks] = useLazyQuery(RECOMMENDED_BOOKS, {
		onError: err => console.log(err.graphQLErrors[0].message)
	})

	useEffect(() => {
		if(loggedIn){
			getGenreBooks().catch(err => console.log(err))
		}
	},[loggedIn, getGenreBooks])

	useEffect(() => {
		if(genreBooks.data){
			if(genreBooks.data.me){
				setGenre(genreBooks.data.me.favoriteGenre)
			}
			if(genreBooks.data.userGenreBooks){
				setBooks(genreBooks.data.userGenreBooks)
			}
		}
	},[genreBooks])

	if(!show) {
		return null
	}

	if(!loggedIn){
		return <p>you must be logged in to view recommendations!</p>
	}	

	if(books === null || genre === null){
		return null
	}

	const bookEntries = books.map(b => (
		<tr key={b.title}>
			<td>{b.title}</td>
			<td>{b.author.name}</td>
			<td>{b.published}</td>
		</tr>
	))

	return (
		<div>
			<p>books in your favorite genre:{genre}</p>
			<h2>books</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>
							author
						</th>
						<th>
							published
						</th>
					</tr>
					{bookEntries}
				</tbody>
			</table>

		</div>
	)
}

export default Recommendations