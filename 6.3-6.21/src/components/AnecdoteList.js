import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initializeAnecdotes, updateAnecdote } from "../reducers/anecdoteReducer"
import { setMessage } from "../reducers/messageReducer"
import Filter from './Filter'

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(state => state.anecdotes)
	const filter = useSelector(state => state.filter)

	useEffect(() => {
		dispatch(initializeAnecdotes())
	}, [dispatch])

	const vote = id => {
		const selected = anecdotes.find(a => a.id === id)
		const newData = {...selected, votes: selected.votes + 1}
		dispatch(updateAnecdote(newData))	
		dispatch(setMessage(selected.content, "VOTE", 5000))
	}

	return (
		<div style={{marginTop:100}}>
			<h2>Anecdotes</h2>
			<Filter/>
			{anecdotes
				.filter(a => {
					const content = a.content	
					return content.toLowerCase().includes(filter.toLowerCase())
				})
				.sort((a, b) => a.votes < b.votes)
				.map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => vote(anecdote.id)}>vote</button>
						</div>
					</div>
				)}
		</div>

	)
}

export default AnecdoteList