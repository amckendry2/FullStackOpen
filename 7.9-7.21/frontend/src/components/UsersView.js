import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router'

import UsersList from './UsersList'
import UserView from './UserView'

const UsersView = () => {
	const userState = useSelector(state => state.user)
	const selectedId = useMatch('users/:id')
	const selectedUser = selectedId ?
		userState.users.find(u => u.id === selectedId.params.id) :
		null

	return (
		<Routes>
			<Route
				path='/'
				element={<UsersList users={userState.users}/>}/>

			<Route
				path=':id'
				element={<UserView user={selectedUser}/>}/>

		</Routes>
	)
}

export default UsersView