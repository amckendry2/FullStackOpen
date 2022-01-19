import { connect } from "react-redux"
import { addNew } from '../reducers/anecdoteReducer'
import { setMessage } from "../reducers/messageReducer"

const AnecdoteForm = props => {

	const getId = () => (100000 * Math.random()).toFixed(0)

	const asObject = anecdote => ({
		content: anecdote,
		id: getId(),
		votes: 0
	})

	const createEntry = async e => {
		e.preventDefault()
		const content = e.target.content.value
		e.target.value = ''
		props.addNew(asObject(content))
		props.setMessage(content, "NEW", 5000)
	}

	return (
		<div style={{ marginTop: 30 }}>
			<h2>create new</h2>
			<form onSubmit={createEntry}>
				<div><input name="content" /></div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default connect(
	null,
	{ setMessage, addNew }
)(AnecdoteForm)