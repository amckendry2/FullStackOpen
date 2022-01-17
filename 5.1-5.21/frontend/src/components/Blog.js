import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleAddLike, handleDelete }) => {
	const [show, setShow] = useState(false)
	return (
		<div
			style={{ border: '1px solid black', padding: 5 }}
			className="blog"
		>
			{blog.title} by: {blog.author}
			<button onClick={() => setShow(!show)}>
				{show ? 'hide' : 'view'}
			</button>
			<div className="details" style={{ display: show ? '' : 'none' }}>
				<p>{blog.url}</p>
				<div style={{ display: 'inline-block' }}>
					likes: {blog.likes}
					<button onClick={handleAddLike}>like</button>
				</div>
				<p>{blog.user.name}</p>
				<button onClick={handleDelete}>delete</button>
			</div>
		</div>
	)
}

Blog.propTypes = {
	handleAddLike: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
	blog: PropTypes.exact({
		title: PropTypes.string,
		author: PropTypes.string,
		url: PropTypes.string,
		likes: PropTypes.number,
		user: PropTypes.exact({
			id: PropTypes.string,
			name: PropTypes.string,
			username: PropTypes.string
		}).isRequired,
		id: PropTypes.string.isRequired
	})
}

export default Blog