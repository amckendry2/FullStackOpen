import React from 'react'

const Notification = ({ msg, isError }) => {

	const color = isError ? 'red' : 'green'

	return (
		<>
			{msg !== null ?
				<div className='notification' style={{
					border: `2px solid ${color}`,
					color: `${color}`
				}}>
					{msg}
				</div>

				: null
			}
		</>
	)
}

export default Notification