import { View, Pressable, StyleSheet } from 'react-native'
import { format } from 'date-fns'
import theme from '../../theme'
import ThemedText from '../ThemedText'
import { useNavigate } from 'react-router-native'

const style = StyleSheet.create({
	buttonText: {
		alignSelf: 'center',
		color: 'white'
	},
	button: {
		backgroundColor: theme.colors.primary,
		marginTop: 10,
		borderRadius: 3,
		padding: 5,
		width: 80,
		margin: 10
	},
})


const ReviewItem = ({ review, userView, handleDelete }) => {

	const navigate = useNavigate()

	const handleGoToRepo = () => {
		navigate(`/repos/${review.repository.id}`)
	}

	return (
		<>
		<View style={{
			display: 'flex',
			flexDirection: 'row',
			margin: 10
		}}>
			<View style={{
				display: 'flex',
				width: 40,
				height: 40,
				borderRadius: 20,
				borderWidth: 3,
				borderColor: theme.colors.primary,
				alignItems: 'center',
				justifyContent: 'center'
			}}>
				<ThemedText
					color='primary'
					fontWeight='bold'
					fontSize='subheading'
				>
					{review.rating}
				</ThemedText>
			</View>
			<View style={{
				display: 'flex', 
				flexDirection:'column',
				width: 300,
				marginLeft: 10,
			}}>
				<ThemedText
					fontSize='subheading'
					fontWeight='bold'
				>
					{userView 
						? review.repository.fullName 
						: review.user.username 
					}
				</ThemedText>
				<ThemedText withPadding>
					{format(new Date(review.createdAt), 'MM/dd/yyyy')}
				</ThemedText>
				<ThemedText>
					{review.text}
				</ThemedText>
			</View>
		</View>
		{userView 
		? 
		<View style={{ display: 'flex', flexDirection: 'row' }}>
			<Pressable
				style={style.button}
				onPress={handleGoToRepo}
			>
				<ThemedText style={style.buttonText}>
					Repository
				</ThemedText>
			</Pressable>
			<Pressable
				style={[style.button, { backgroundColor: 'red' }]}
				onPress={() => handleDelete(review.id)}
			>
				<ThemedText style={style.buttonText}>
					Delete
				</ThemedText>
			</Pressable>
		</View>
		: null
		}
		</>
	)
}

export default ReviewItem