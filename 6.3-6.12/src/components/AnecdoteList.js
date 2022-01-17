import { useDispatch, useSelector } from "react-redux"
import { voteById } from "../reducers/anecdoteReducer"
import { setMessage, clearMessage } from "../reducers/messageReducer"
import Filter from './Filter'

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(state => state.anecdotes)
	const filter = useSelector(state => state.filter)

	const vote = id => {
		dispatch(voteById(id))
		const selected = anecdotes.find(a => a.id === id)
		dispatch(setMessage(selected.content, "VOTE"))
		setTimeout(() => dispatch(clearMessage(selected.content)), 5000)
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			<Filter/>
			{anecdotes
				.filter(a => {
					const content = a.content	
					return content.toLowerCase().includes(filter.toLowerCase())
				})
				.sort((a, b) => a.votes <= b.votes)
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