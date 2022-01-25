import React from 'react'
import { Input } from '../styles'

const InputTextField = ({ id, text, value, changeHandler }) => {
	return (
		<div>
			<Input
				id={id}
				type='text'
				value={value}
				placeholder={text}
				onChange={({ target }) => changeHandler(target.value)} />
		</div>
	)
}

export default InputTextField