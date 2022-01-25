import React from 'react'
import { Link } from 'react-router-dom'

const UsersList = ({ users }) => {
	const usersData = users.map((u, idx) => (
		<tr key={idx}>
			<td style={{ width: 200 }}>
				<Link to={u.id}>{u.name}</Link>
			</td>
			<td>{u.blogs.length}</td>
		</tr>
	))
	return (
		<>
			<h2>Users</h2>
			<table>
				<tbody>
					<tr>
						<th style={{ width: 200 }}></th>
						<th>blogs created</th>
					</tr>
					{usersData}
				</tbody>
			</table>
		</>
	)
}

export default UsersList