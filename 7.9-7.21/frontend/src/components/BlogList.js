import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, handleAddLike, handleDelete, currentUser }) =>
	blogs
		.sort((a, b) => a.likes < b.likes)
		.map(blog =>
			<Blog
				key={blog.id}
				blog={blog}
				handleAddLike={() => handleAddLike(blog)}
				handleDelete={() => handleDelete(blog)}
				currentUser={currentUser}/>)

export default BlogList