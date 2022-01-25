import React from 'react'
import { useSelector } from 'react-redux'

const NotificationBar = () => {

	const { msg, isError } = useSelector(state => state.notification)

	const color = isError ? 'red' : 'green'

	return (
		<>
			{msg ?
				<div className='notification' style={{
					border: `2px solid ${color}`,
					color: `${color}`,
					backgroundColor: 'white',
					position: 'fixed',
					bottom: '20%'
				}}>
					{msg}
				</div>

				: null
			}
		</>
	)
}

export default NotificationBar