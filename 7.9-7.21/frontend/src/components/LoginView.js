import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, logoutUser } from '../reducers/usersReducer'
import { Button, Panel, InputForm, Header } from '../styles'
import InputTextField from './InputTextField'

const LoginView = () => {

	const dispatch = useDispatch()
	const user = useSelector(state => state.user.currentUser)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogout = () => dispatch(logoutUser(user))

	const handleLoginSubmit = e => {
		e.preventDefault()
		dispatch(loginUser({ username, password }))
		setUsername('')
		setPassword('')
	}

	return (
		<>
			{user ?
				<div style={{ marginTop: '10px' }}>
					[{user.name} logged in]
					<Button onClick={handleLogout}>log out</Button>
				</div>

				:

				<div style={{ margin:'20px 80px', width: '200px' }}>

					<Panel>
						<Header>Login</Header>
						<InputForm onSubmit={handleLoginSubmit}>
							<InputTextField
								id='username'
								value={username}
								text='username'
								changeHandler={setUsername}
							/>

							<InputTextField
								id='password'
								value={password}
								text='password'
								changeHandler={setPassword}
							/>
							<Button id='login' type='submit'>login</Button>
						</InputForm>
					</Panel>
				</div>
			}
		</>
	)
}

export default LoginView