const initState = {
	msg: null,
	isError: false,
	pendingClear: null
}

const reducer = (state = '', action) => {
	switch (action.type) {
		case 'setMessage':
			return action.data
		case 'clearMessage':
			return initState
		default:
			return state
	}
}

export const setMessage = (msg, isError, ms) => (
	async (dispatch, getState) => {
		clearTimeout(getState().notification.pendingClear)
		dispatch({
			type: 'setMessage',
			data: {
				msg: msg,
				isError: isError,
				pendingClear: setTimeout(() => {
					dispatch({
						type: 'clearMessage'
					})
				}, ms)
			}
		})
	}
)

export default reducer