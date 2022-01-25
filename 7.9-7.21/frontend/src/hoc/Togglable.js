import React from 'react'

const Togglable = ({ show, handleToggle, buttonName, children }) => {

	const visibleOnShow = { display: show ? '' : 'none' }
	const hiddenOnShow = { display: show ? 'none' : '' }

	return (
		<div style={{ margin: 10 }}>
			<div style={hiddenOnShow}>
				<button onClick={handleToggle}>{buttonName}</button>
			</div>
			<div style={visibleOnShow}>
				{children}
			</div>
		</div>
	)

}

export default Togglable