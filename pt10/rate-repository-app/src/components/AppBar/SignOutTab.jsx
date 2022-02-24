import { Pressable, Text, StyleSheet } from 'react-native'
import theme from '../../theme'

const styles = StyleSheet.create({
	tab:{
		flexGrow: 0,
		padding: 10
	},
	text:{
		color: theme.colors.navBarTabText 
	}
})

const SignOutTab = ({ pressHandler, text }) => {
	return (
		<Pressable 
			style={styles.tab} 
			onPress={pressHandler}>
				<Text style={styles.text}>{text}</Text>
		</Pressable>
	)
}

export default SignOutTab;