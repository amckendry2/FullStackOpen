import useSignIn from '../../hooks/useSignIn'
import { useNavigate } from 'react-router-native'
import SignInForm from './SignInForm'

const SignIn = () => {

	const [signIn] = useSignIn()
	const navigate = useNavigate()

	const onSubmit = async params => {
		await signIn(params)
		navigate('/', {replace: true})
	}

	return <SignInForm onSubmit={onSubmit}/>
}

export default SignIn