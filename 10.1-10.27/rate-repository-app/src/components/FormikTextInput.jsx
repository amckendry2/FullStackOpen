import { StyleSheet } from 'react-native'
import { useField } from 'formik'
import ThemedTextInput from './ThemedTextInput'
import ThemedText from './ThemedText'

const styles = StyleSheet.create({
	errorMsg: {
		marginTop: 5,
		color: 'red',
	}
})

const FormikTextInput = ({ name, ...props }) => {
	const [field, meta, helpers] = useField(name)
	const showError = meta.touched && meta.error

	return (
		<>
			<ThemedTextInput
				onChangeText={value => helpers.setValue(value)}
				onBlur={() => helpers.setTouched(true)}
				value={field.value}
				error={showError}
				{...props}
			/>
			{showError &&
				<ThemedText style={styles.errorMsg}>
					{meta.error}
				</ThemedText>}
		</>
	)
}

export default FormikTextInput