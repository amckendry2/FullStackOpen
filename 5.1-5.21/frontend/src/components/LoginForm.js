import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		const data = { username, password }
		handleLogin(data)
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				username:
				<input
					id='username'
					type='text'
					value={username}
					name='Username'
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password:
				<input
					id='password'
					type='text'
					value={password}
					name='Password'
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button id='login' type='submit'>login</button>
		</form>
	)
}

export default LoginForm