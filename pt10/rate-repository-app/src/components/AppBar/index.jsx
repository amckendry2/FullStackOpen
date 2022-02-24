import { View, StyleSheet, ScrollView } from 'react-native' 
import AppBarTab from './AppBarTab'
import SignOutTab from './SignOutTab'
import theme from '../../theme'
import { useQuery } from '@apollo/client'
import { GET_ME } from '../../graphql/queries'
import useSignIn from '../../hooks/useSignIn'

const styles = StyleSheet.create({
	container: {
		paddingTop: theme.spacing.navBar,
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: theme.colors.navBar,
		marginBottom: 5 
	}
})

const AppBar = () => {

	const[, signOut] = useSignIn()
	const me = useQuery(GET_ME)	

	const signInOrOut = me.data && me.data.me
		? 
		<>
		<AppBarTab to='/myreviews' text='MY REVIEWS'/>
		<SignOutTab
			text={'SIGN OUT'}
			pressHandler={signOut}
		/>
		</>
		: 
		<>
			<AppBarTab to='/signin' text={'SIGN IN'}/>
			<AppBarTab to='/signup' text='SIGN UP'/>
		</>

	return (
		<View style={styles.container}>
			<ScrollView horizontal>
				<AppBarTab to='/' text='REPOSITORIES' />
				<AppBarTab to='/createReview' text='CREATE REVIEW'/>
				{signInOrOut}
			</ScrollView>
		</View>
	)
}

export default AppBar