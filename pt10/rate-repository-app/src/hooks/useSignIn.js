import { useApolloClient, useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations'
import useAuthStorage from './useAuthStorage'

const useSignIn = () => {

	const authStorage = useAuthStorage()
	const [mutate] = useMutation(AUTHENTICATE)
	const apolloClient = useApolloClient()

	const signIn = async params => {
		try {
			const { data: retData } = await mutate({
				variables: {
					credentials: params
				}
			})
			await authStorage.setAccessToken(retData.authenticate.accessToken)
			await apolloClient.resetStore()	
		} catch(err) {
			console.log(err)
		}
	}

	const signOut = async () => {
		try {
			await authStorage.removeAccessToken()
			await apolloClient.resetStore()
		} catch (err) {
			console.log(err)
		}
	}

	return [signIn, signOut];
}

export default useSignIn