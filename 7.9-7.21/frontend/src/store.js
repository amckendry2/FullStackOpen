import {
	createStore,
	combineReducers,
	applyMiddleware
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import usersReducer from './reducers/usersReducer'
import notificationMiddleware from './reducers/notificationMiddleware'

const reducer = combineReducers({
	notification: notificationReducer,
	blogs: blogsReducer,
	user: usersReducer
})

const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(thunk, notificationMiddleware)
	)
)

export default store