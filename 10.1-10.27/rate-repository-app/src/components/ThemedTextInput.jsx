import { TextInput, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	input: {
		borderRadius: 3,
		padding: 5,
		borderWidth: 1,
		borderColor: 'black',
		borderStyle: 'solid',
		marginTop: 8
	},
	error: {
		color: 'red',
		backgroundColor: 'lightgrey',
		borderWidth: 1,
		borderColor: 'red',
		borderStyle: 'solid'
	}
})

const ThemedTextInput = ({ style, error, ...props }) => {

	const inputStyle = [
		styles.input,
		style,
		error && styles.error
	]

	return <TextInput style={inputStyle}{...props}/>
}

export default ThemedTextInput