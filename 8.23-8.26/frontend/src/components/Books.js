import React, { useState } from 'react'

const Books = ({ show, allBooks }) => {

  const [genre, setGenre] = useState('')

  if (!show || allBooks.loading === 0) {
    return null
  }

  const bookData = allBooks.data.allBooks

  const genreButtons = bookData
    .reduce((a, c) => (
      a.concat(c.genres.filter(g => !a.includes(g)))
    ), [])
    .map(g => (
      <button key={g} onClick={() => setGenre(g)}>{g}</button>
    ))

  const bookEntries = bookData
      .filter(b => genre !== '' ? b.genres.includes(genre) : true)
      .map(b => (
        <tr key={b.title}>
          <td>{b.title}</td>
          <td>{b.author.name}</td>
          <td>{b.published}</td>
        </tr>
      ))

  return (
    <div>
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
      <div>
        {genreButtons}
        <button onClick={() => setGenre('')}>all</button>
      </div>
    </div>
  )
}

export default Books