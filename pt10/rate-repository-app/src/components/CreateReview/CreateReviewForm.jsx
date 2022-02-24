import * as yup from 'yup'
import { Formik } from 'formik'
import FormikTextInput from '../FormikTextInput'
import { View, Pressable, StyleSheet } from 'react-native'
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
	repositoryOwner: '',
	repositoryName: '',
	rating: '',
	review: ''
}

const validationSchema = yup.object().shape({
	repositoryOwner: yup
		.string()
		.required('Repository owner name is required'),
	repositoryName: yup
		.string()
		.required('Repository name is required'),
	rating: yup
		.number()
		.typeError('Rating must be a number')
		.min(0, 'Rating must be at least 0')
		.max(100, 'Rating must be 100 or less')
		.required('Rating between 0 and 100 is required'),
	review: yup
		.string()
})

const CreateReviewForm = ({ onSubmit }) => {
	return(
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}

		>
			{({ handleSubmit }) => (
				<View style={style.form}>
					<FormikTextInput name='repositoryOwner' placeholder='Repository owner name' />
					<FormikTextInput name='repositoryName' placeholder='Repository name' />
					<FormikTextInput name='rating' placeholder='Rating between 0 and 100'/>
					<FormikTextInput name='review' placeholder='Review'/>
					<Pressable testID='submitButton' onPress={handleSubmit} style={style.button}>
						<ThemedText style={style.buttonText}>Create</ThemedText>
					</Pressable>
				</View>
			)}

		</Formik>
	)
}

export default CreateReviewForm