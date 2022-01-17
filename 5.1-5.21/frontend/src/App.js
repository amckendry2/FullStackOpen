import React, { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './hoc/Togglable'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [notification, setNotification] = useState({ msg: null, isError: false })
	const blogFormRef = useRef()

	useEffect(() => {
		const loggedInUserData = window.localStorage.getItem('blogAppUser')
		if(loggedInUserData){
			const parsedUserData = JSON.parse(loggedInUserData)
			setUser(parsedUserData)
		}
	},[])

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])

	const tempNotification = (msg, isError, len) => {
		setNotification({ msg, isError })
		setTimeout(() => {
			setNotification({ msg: null, isError: false })
		}, len)
	}

	const handleLogin = async data => {
		console.log(data)
		try {
			const user = await loginService.login(data)
			console.log(user)
			window.localStorage.setItem('blogAppUser', JSON.stringify(user))
			setUser(user)
			tempNotification(`${user.username} logged in!`, false, 2000)
		} catch(err) {
			console.log(err)
			tempNotification('wrong username or password!', true, 2000)
		}
	}

	const handleLogout = e => {
		e.preventDefault()
		window.localStorage.removeItem('blogAppUser')
		setUser(null)
	}

	const handleNewBlog = async data => {
		blogFormRef.current.setShow(false)
		try {
			const res = await blogService.postNew(data, user.token)
			setBlogs(blogs.concat(res))
			tempNotification(`added new blog: ${ res.title } by ${ res.author }`, false, 2000)
		} catch(err) {
			console.log(err)
			tempNotification('failed to add blog', true, 2000)
		}
	}

	const handleAddLike = async blog => {
		blog.likes++
		try {
			const data = {
				...blog,
				user: blog.user.id
			}
			await blogService.addLike(data)
			const updatedBlogs = blogs.map(b => b.id === blog.id ? blog : b)
			setBlogs(updatedBlogs)
		} catch(err) {
			console.log(err)
			tempNotification('error adding like', true, 2000)
		}
	}

	const handleDelete = async blog => {
		if (window.confirm(`Delete blog: ${ blog.title }?`)) {
			try {
				await blogService.deleteBlog(blog, user.token)
				setBlogs(blogs.filter(b => b.id !== blog.id))
				tempNotification(`deleted ${ blog.title }`, false, 2000)
			} catch (err) {
				console.log(err)
			}
		}
	}

	const blogDisplay = blogs
		.sort((a, b) => a.likes < b.likes)
		.map(blog =>
			<Blog
				key={blog.id}
				blog={blog}
				handleAddLike={() => handleAddLike(blog)}
				handleDelete={() => handleDelete(blog)} />)


	return (
		<div>
			<Notification msg={notification.msg} isError={notification.isError}/>

			{user === null ?

				<LoginForm handleLogin={handleLogin} /> :

				<div>

					<h2>blogs</h2>
					{user.name} logged in
					<button onClick={handleLogout}>log out</button>
					<Togglable buttonName={'create new blog'} ref={blogFormRef}>
						<h2>create new</h2>
						<BlogForm handleNewBlog={handleNewBlog} />
					</Togglable>

					{blogDisplay}

				</div>
			}
		</div>
	)
}
export default App