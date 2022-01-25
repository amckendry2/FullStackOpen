import loginService from '../services/login'
import usersService from '../services/users'

const initState = {
	currentUser: null,
	users: []
}

const reducer = (state = initState, action) => {
	switch(action.type){
		case 'loginUser':
			return { ...state, currentUser: action.data.user }
		case 'logoutUser':
			return { ...state, currentUser: null }
		case 'addUser':
			return { ...state, users: state.users.concat(action.data.user) }
		case 'clearUsers':
			return { ...state, users: [] }
		default:
			return state
	}
}

export const initCurrentUser = () => (
	dispatch => {
		const loggedInUserData = window.localStorage.getItem('blogAppUser')
		if (loggedInUserData) {
			dispatch({
				type: 'loginUser',
				data: { user: JSON.parse(loggedInUserData) }
			})
		}
	}
)

export const initUsers = () => (
	async dispatch => {
		dispatch({
			type: 'clearUsers'
		})
		const allUsersData = await usersService.getAllUsers()
		allUsersData.forEach(u =>
			dispatch({
				type: 'addUser',
				data: { user: u }
			})
		)
	}
)

export const loginUser = user => (
	async dispatch => {
		try {
			const loggedInUser = await loginService.login(user)
			window.localStorage.setItem('blogAppUser', JSON.stringify(loggedInUser))
			dispatch({
				type: 'loginUser',
				data: { user: loggedInUser }
			})
		} catch (err) {
			console.log(err)
			dispatch({
				type: 'loginUserFailed'
			})
		}
	}
)

export const logoutUser = user => (
	dispatch => {
		window.localStorage.removeItem('blogAppUser')
		dispatch({
			type: 'logoutUser',
			data: { user: user }
		})
	}
)

export default reducer