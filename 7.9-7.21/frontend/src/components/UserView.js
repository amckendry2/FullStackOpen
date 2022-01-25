import React from 'react'

const UserView = ({ user }) => {
	const blogList = user.blogs.map(b => <li key={b.id}>{b.title}</li>)
	return (
		<>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			<ul>
				{blogList}
			</ul>
		</>
	)
}

export default UserView