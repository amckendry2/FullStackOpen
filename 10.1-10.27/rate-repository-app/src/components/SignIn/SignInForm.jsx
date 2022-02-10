import * as yup from 'yup'
import { View, Pressable, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import FormikTextInput from '../FormikTextInput'
import ThemedText from '../ThemedText'
import theme from '../../theme'

const style = StyleSheet.create({
	button: {
		backgroundColor: theme.colors.primary,
		marginTop: 10,
		borderRadius: 3,
		padding: 5
	},
	buttonText: {
		alignSelf: 'center',
		color: 'white'
	},
	form:{
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'black',
		padding: 10,
		display: 'flex',
		flexDirection: 'column',
		width: 300
	}
})

const initialValues = {
	username: '',
	password: ''
}

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.min(4, 'Must be at least 4 characters')
		.max(12, 'Must be 12 characters or less')
		.required('Username is required'),
	password: yup
		.string()
		.min(6, 'Must be at least 6 characters')
		.max(12, 'Must be 12 characters or less')
		.required('Password is required'),
})

const SignInForm = ({ onSubmit }) => (
	<Formik
		initialValues={initialValues}
		onSubmit={onSubmit}
		validationSchema={validationSchema}
	>
		{({ handleSubmit }) => (
			<View style={style.form}>
				<FormikTextInput name='username' placeholder='username' />
				<FormikTextInput name='password' placeholder='password' />
				<Pressable testID='submitButton' onPress={handleSubmit} style={style.button}>
					<ThemedText style={style.buttonText}>Sign In</ThemedText>
				</Pressable>
			</View>
		)}
	</Formik>
)

export default SignInForm