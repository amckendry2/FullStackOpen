import { Pressable, Text, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'
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

const AppBarTab = ({ to, text }) => {
	return (
		<Pressable style={styles.tab}>
			<Link to={to}>
				<Text style={styles.text}>{text}</Text>
			</Link>
		</Pressable>
	)
}

export default AppBarTab;