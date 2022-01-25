import React, { useState } from 'react'

const BlogForm = ({ handleNewBlog }) => {

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		handleNewBlog({ title, author, url })
	}

	return (
		<form onSubmit={handleSubmit} style={{ margin: 10 }}>
			<div>
				title:
				<input
					id='title'
					type='text'
					value={title}
					name='Title'
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				author:
				<input
					id='author'
					type='text'
					value={author}
					name='Author'
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
				url:
				<input
					id='url'
					type='text'
					value={url}
					name='URL'
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button style={{ margin:10 }} id='create' type='submit'>create</button>
		</form>
	)
}

export default BlogForm