import { useMutation } from "@apollo/client";
import useSignIn from "../../hooks/useSignIn";
import SignUpForm from "./SignUpForm";
import { CREATE_USER } from '../../graphql/mutations'
import { useNavigate } from "react-router-native";


const SignUp = () => {

	const [signIn] = useSignIn()
	const [signUp] = useMutation(CREATE_USER)
	const navigate = useNavigate()

	const onSubmit = async ({ username, password }) => {
		const userParams = {username, password}
		try {
			await signUp({
				variables: {
					user: userParams
				}
			})
			await signIn(userParams)
			navigate('/')
		} catch (err) {
			console.log(err)
		}
	}

	return <SignUpForm onSubmit={onSubmit} />
}

export default SignUp