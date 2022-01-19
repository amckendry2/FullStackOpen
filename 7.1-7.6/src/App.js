import React, { useState } from 'react'
import { useField } from './hooks/index'
import {
  Routes,
  Route,
  Link, 
  useMatch,
  useNavigate
} from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='create' style={padding}>create new</Link>
      <Link to='about' style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const Anecdote = ({data}) => (
  <>
  {data ? 
    <div style={{padding: 10}}>
      <h2>{data.content} by {data.author}</h2>
      <p> has {data.votes} votes </p>
      <div>
        for more info see <a href={data.info}>{data.info}</a>
      </div>
    </div>
    :
    <h2>anecdote not found!</h2>}
  </>
)

const Notification = ({ message }) => (
  <h3>{message}</h3>
)

const CreateNew = props => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.props.value,
      author: author.props.value,
      info: info.props.value,
      votes: 0
    })
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.props} />
        </div>
        <div>
          author
          <input {...author.props} /> 
        </div>
        <div>
          url for more info
          <input {...info.props} />
        </div>
        <button>create</button>
      </form>
      <button onClick={handleReset}>reset</button>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const navigate = useNavigate()

  const selectedID = useMatch('anecdotes/:id')
  const selectedAnecdote = selectedID ? 
    anecdotes.find(a => a.id === selectedID.params.id) :
    null

  console.log('selected: ', selectedID)

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate("/")
    setNotification(`created: ${anecdote.content}`)
    setTimeout(() => setNotification(''), 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification !== '' && <Notification message={notification}/>}
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>}/>
        <Route path='anecdotes' element={<AnecdoteList anecdotes={anecdotes}/>}/>
        <Route path='about' element={<About />}/>
        <Route path='create' element={<CreateNew addNew={addNew}/>}/>
        <Route path='anecdotes/:id' element={<Anecdote data={selectedAnecdote}/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App;