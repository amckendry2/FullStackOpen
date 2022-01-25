import blogsService from '../services/blogs'

const reducer = (state = [], action) => {
	switch(action.type){
		case 'clearBlogs':
			return []
		case 'addBlog':
			return state.concat(action.data.blog)
		case 'loadBlog':
			return state.concat(action.data.blog)
		case 'updateBlog':
			return state.map(b => (
				b.id === action.data.blog.id ? action.data.blog : b
			))
		case 'deleteBlog':
			return state.filter(b => (
				b.id !== action.data.blog.id
			))
		default:
			return state
	}
}

export const initializeBlogs = () => (
	async dispatch => {
		try {
			const data = await blogsService.getAll()
			dispatch({ type: 'clearBlogs' })
			data.forEach(b =>
				dispatch({
					type: 'loadBlog',
					data: { blog: b }
				})
			)
		} catch (err) {
			console.log(err)
			dispatch({
				type: 'initializeBlogsFailed'
			})
		}
	}
)

export const initializeBlogsFailed = () => ({
	type: 'initializeBlogsFailed'
})

export const addBlog = (blog, token) => (
	async dispatch => {
		try {
			const data = await blogsService.postNew(blog, token)
			dispatch({
				type: 'addBlog',
				data: { blog: data }
			})
		} catch (err) {
			console.log(err)
			dispatch({
				type: 'addBlogFailed',
				data: { blog: blog }
			})
		}
	}
)

export const addBlogFailed = blog => ({
	type:'addBlogFailed',
	data: { blog: blog }
})

export const addLike = blog => (
	async dispatch => {
		try{
			const data = await blogsService.addLike(blog)
			dispatch({
				type: 'updateBlog',
				data: { blog: data }
			})
		} catch (err) {
			console.log(err)
			dispatch({
				type: 'updateBlogFailed',
				data: { blog: blog }
			})
		}
	}
)

export const addComment = (blog, comment) => (
	async dispatch => {
		try {
			const data = await blogsService.addComment(blog, comment)
			dispatch({
				type: 'updateBlog',
				data: { blog: data }
			})
		} catch(err) {
			console.log(err)
		}
	}
)

export const deleteBlog = (blog, token) => (
	async dispatch => {
		try {
			await blogsService.deleteBlog(blog, token)
			dispatch({
				type: 'deleteBlog',
				data: { blog: blog }
			})
		} catch (err) {
			console.log(err)
			dispatch({
				type: 'deleteBlogFailed',
				data: { blog: blog }
			})
		}
	}
)

export default reducer