import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import RepositoryList from './RepositoryList/'
import AppBar from './AppBar/'
import SignIn from './SignIn/'
import SingleRepo from './RepositoryList/SingleRepo'
import CreateReview from './CreateReview/'
import SignUp from './SignUp/'
import MyReviews from './MyReviews/'

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexShrink: 1
	}
})

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar />
			<Routes>
				<Route path='/myreviews' element={<MyReviews/>}/>
				<Route path='/repos/:id' element={<SingleRepo/>}/>
				<Route path='/createReview' element={<CreateReview/>}/>
				<Route path='/signin' element={<SignIn/>}/>
				<Route path='/signup' element={<SignUp/>}/>
				<Route path='/' exact element={<RepositoryList/>}/>
				<Route path='*' element={<Navigate to='/' replace/>}/>
			</Routes>
		</View>
	)
}

export default Main;