import { useDispatch } from "react-redux"
import { createNew } from '../reducers/anecdoteReducer'
import { setMessage, clearMessage } from "../reducers/messageReducer"

const AnecdoteForm = () => {

	const dispatch = useDispatch()

  const createEntry = e => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.value = ''
    dispatch(createNew(content))
	dispatch(setMessage(content, "NEW"))
	setTimeout(() => dispatch(clearMessage(content)), 5000)
  }

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={createEntry}>
				<div><input name="content" /></div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm