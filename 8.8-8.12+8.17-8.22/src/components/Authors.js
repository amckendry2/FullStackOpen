  
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS) 
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const handleEditAuthor = e => {
    e.preventDefault()
    editAuthor({ 
      variables: {
        name: name,
        born: parseInt(born)
      },
      refetchQueries: [{ query: ALL_AUTHORS }]
    })
    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  if(authors.loading){
    return null
  }

  const authorOptions = authors.data.allAuthors.map(a => 
    <option key={a.name} value={a.name}>{a.name}</option>
  )

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>edit author</h2>
      <form 
        style={{ display: 'list-item', width: 100, marginTop:10 }}
        onSubmit={handleEditAuthor}
      >
        <div>
          name
          <select 
            onChange={({target}) => setName(target.value)}
            defaultValue='default'>
              <option disabled value='default'>select author</option>
              {authorOptions}
          </select>
          
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
            style={{ display: 'inline-block', width: '100%' }}
          />
        </div>
        <button type="submit">edit</button>
      </form>
    </div>
  )
}

export default Authors
