import { setMessage } from './notificationReducer'

export default store => next => action => {
	switch(action.type){
		case 'addBlog':
			store.dispatch(
				setMessage(
					`added new blog: ${ action.data.blog.title } by ${ action.data.blog.author }`,
					false,
					2000
				)
			)
			break
		case 'addBlogFailed':
			store.dispatch(
				setMessage(
					`failed to add blog: ${action.data.blog.title}`,
					true,
					2000
				)
			)
			break
		case 'initializeBlogsFailed':
			store.dispatch(
				setMessage(
					'failed to initialize blogs!',
					true,
					2000
				)
			)
			break
		case 'updateBlog':
			store.dispatch(
				setMessage(
					`updated: ${action.data.blog.title}`,
					false,
					2000
				)
			)
			break
		case 'updateBlogFailed':
			store.dispatch(
				setMessage(
					`failed to like: ${action.data.blog.title}`,
					true,
					2000
				)
			)
			break
		case 'deleteBlog':
			store.dispatch(
				setMessage(
					`deleted blog: ${action.data.blog.title}`,
					false,
					2000
				)
			)
			break
		case 'deleteBlogFailed':
			store.dispatch(
				setMessage(
					`failed to delete: ${action.data.blog.title}`,
					true,
					2000
				)
			)
			break
		case 'loginUser':
			store.dispatch(
				setMessage(
					`logged in user: ${action.data.user.name}`,
					false,
					2000
				)
			)
			break
		case 'loginUserFailed':
			store.dispatch(
				setMessage(
					'wrong username or password!',
					true,
					2000
				)
			)
			break
		case 'logoutUser':
			store.dispatch(
				setMessage(
					`logged out user: ${action.data.user.name}`,
					false,
					2000
				)
			)
	}
	return next(action)
}