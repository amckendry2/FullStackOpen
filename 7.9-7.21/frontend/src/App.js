import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'

import { initCurrentUser, initUsers } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogsReducer'

import LoginView from './components/LoginView'
import NotificationBar from './components/NotificationBar'
import BlogsView from './components/BlogsView'
import BlogView from './components/BlogView'
import UsersView from './components/UsersView'

import { PageHeader, NavBar, NavItem, PageTitle } from './styles'

const App = () => {

	const dispatch = useDispatch()
	const user = useSelector(state => state.user.currentUser)
	const blogs = useSelector(state => state.blogs)

	useEffect(() => {
		dispatch(initCurrentUser())
		dispatch(initUsers())
		dispatch(initializeBlogs())
	},[dispatch])

	return (
		<>
			<NotificationBar/>
			<div>
				<div>
					<PageHeader>
						<PageTitle>BLOG APP</PageTitle>
						<NavBar>
							<NavItem>
								<Link to='/' style={{ margin: 5 }}>BLOGS</Link> </NavItem>
							<NavItem>
								<Link to='users' style={{ margin: 5 }}>USERS</Link>
							</NavItem>
						</NavBar>
					</PageHeader>


					<LoginView />
				</div>

				{user &&
					<Routes>
						<Route path='/' element={<BlogsView />} />
						<Route path='blogs' element={<BlogsView />} />
						<Route path='users/*' element={<UsersView />} />
						<Route path='blogs/:id' element={<BlogView blogs={blogs} />} />
					</Routes>
				}

			</div>
		</>
	)
}
export default App