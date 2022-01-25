import React, { useState } from 'react'
import { useMatch } from 'react-router'
import { useDispatch } from 'react-redux'
import { addLike, addComment } from '../reducers/blogsReducer'

const BlogView = ({ blogs }) => {
	const dispatch = useDispatch()
	const [comment, updateComment] = useState('')


	const blogId = useMatch('blogs/:id')
	const selectedBlog = blogId ?
		blogs.find(b => b.id === blogId.params.id)
		: null
	const comments = selectedBlog ?
		selectedBlog.comments.map((c, i) => (
			<li key={i}>{c}</li>
		))
		: null

	const handleSubmitComment = e => {
		e.preventDefault()
		if(comment !== ''){
			dispatch(addComment(selectedBlog, comment))
			updateComment('')
		}
	}

	return (
		<>
			{selectedBlog &&
				<>
					<h2>{selectedBlog.title}</h2>
					<a href={selectedBlog.url}>{selectedBlog.url}</a>
					<p>
						{selectedBlog.likes} likes
						<button onClick={() => dispatch(addLike(selectedBlog))}>
							like
						</button>
					</p>
					<p>added by {selectedBlog.user.name}</p>
					<h2>comments</h2>
					<input
						type="text"
						value={comment}
						onChange={({ target }) => updateComment(target.value)}/>
					<button onClick={handleSubmitComment}>submit</button>
					<ul>
						{comments}
					</ul>
				</>
			}
		</>

	)
}

export default BlogView