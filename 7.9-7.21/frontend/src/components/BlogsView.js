import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addBlog, addLike, deleteBlog } from '../reducers/blogsReducer'

import Togglable from '../hoc/Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const BlogsView = () => {

	const dispatch = useDispatch()
	const user = useSelector(state => state.user.currentUser)
	const blogs = useSelector(state => state.blogs)
	const [showForm, setShowForm] = useState(false)

	const handleNewBlog = data => {
		setShowForm(false)
		dispatch(addBlog(data, user.token))
	}

	const handleAddLike = blog => dispatch(addLike(blog))

	const handleDelete = async blog => {
		if (window.confirm(`Delete blog: ${blog.title}?`)) {
			dispatch(deleteBlog(blog, user.token))
		}
	}

	return (
		<>
			<h2>Blogs</h2>
			<Togglable
				buttonName={'create new blog'}
				show={showForm}
				handleToggle={() => setShowForm(true)}
			>

				<h2>create new</h2>

				<BlogForm handleNewBlog={handleNewBlog}/>

			</Togglable>

			<BlogList
				blogs={blogs}
				handleAddLike={handleAddLike}
				handleDelete={handleDelete}
				currentUser={user}/>
		</>
	)
}

export default BlogsView