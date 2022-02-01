
import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import { useApolloClient, useMutation, useSubscription } from '@apollo/client'
import { LOGIN_USER, BOOK_ADDED } from './queries'
import { useAddBookToCache } from './hooks'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState('')
  const allBooks = useQuery(ALL_BOOKS) 
  const tryAddBook = useAddBookToCache()

	const [loginRequest, loginStatus] = useMutation(LOGIN_USER)
  const client = useApolloClient()

  useEffect(() => {
    const oldToken = localStorage.getItem('token')
    if(oldToken){
      setToken(oldToken)
    }
  },[])

	useEffect(() => {
		if (loginStatus.data) {
      console.log('loginstatus.data', loginStatus.data)
			localStorage.setItem('token', loginStatus.data.login.value)	
      setToken(loginStatus.data.login.value)
		}	
	},[loginStatus.data])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
//      window.alert(`added book: ${subscriptionData.data.bookAdded.title}`)
      tryAddBook(subscriptionData.data.bookAdded)
    }
  })

  const handleLoginRequest = (username, password) => {
    loginRequest({ variables: { username: username, password: password }})
    setPage('authors')
  }

  const handleLogout = () => {
    setToken('')
    localStorage.clear()
    client.clearStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        {token === '' ?
          <button onClick={() => setPage('login')}>login</button> :
          <button onClick={handleLogout}>logout</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
        allBooks={allBooks}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page ==='login'}
        handleLoginRequest={handleLoginRequest}
      />

      <Recommendations
        show={page ==='recommended'}
        loggedIn={token !== ''}
      />

    </div>
  )
}

export default App