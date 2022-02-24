import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthStorage = (namespace = 'auth') => {
	return {
		getAccessToken: async () => {
			const token = await AsyncStorage.getItem(
				`${namespace}:token`
			)
			return token 
		},
		setAccessToken: async (token) => {
			await AsyncStorage.setItem(
				`${namespace}:token`,
				token
			)
		},
		removeAccessToken: async () => {
			await AsyncStorage.removeItem(
				`${namespace}:token`
			)
		}
	}
}

export default AuthStorage