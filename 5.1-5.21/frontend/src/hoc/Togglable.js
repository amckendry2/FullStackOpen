import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
	const { buttonName, children } = props

	const [show, setShow] = useState(false)

	useImperativeHandle(ref, () => ({ setShow }))

	const visibleOnShow = { display: show ? '' : 'none' }
	const hiddenOnShow = { display: show ? 'none' : '' }

	return (
		<div>
			<div style={hiddenOnShow}>
				<button onClick={setShow}>{buttonName}</button>
			</div>
			<div style={visibleOnShow}>
				{children}
			</div>
		</div>
	)

})

Togglable.displayName = 'Togglable'

export default Togglable