import React from 'react'
import AnecdoteForm from './components/AndecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {

  return (
    <>
      <Notification/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </>
  )
}

export default App