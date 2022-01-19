import anecdotesService from '../services/anecdotesService'

const reducer = (state = [], action) => {

  switch(action.type){
    case "UPDATE":
      return state.map(a => 
        a.id === action.data.id ? 
          action.data : a
      )
    case "NEW":
      return state.concat(action.data)
    default:
      return [...state]
  }
}

export const updateAnecdote = data => async dispatch => {
  const updatedAnecdote = await anecdotesService.updateAnecdote(data)
  dispatch({type: "UPDATE", data: updatedAnecdote})
}
 
export const initializeAnecdotes = () => async dispatch => {
  const data = await anecdotesService.getAll()
  data.forEach(a => dispatch({ type: "NEW", data: a }))
}

export const addNew = anecdote => async dispatch => {
  const newAnecdote = await anecdotesService.postNew(anecdote)
  dispatch({ type: "NEW", data: newAnecdote })
}

export default reducer