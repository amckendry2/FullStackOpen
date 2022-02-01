import React, { useState } from 'react'

const Login = ({ show, handleLoginRequest }) => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleFormSubmit = e => {
		e.preventDefault()
		handleLoginRequest(username, password)
		setUsername('')
		setPassword('')
	}

	if(!show) {
		return null		
	}

	return (
		<form onSubmit={handleFormSubmit}>
			<div>
				name
				<input
					type="text"
					value={username}
					placeholder='username'
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="text"
					value={password}
					placeholder='password'
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	)


}

export default Login