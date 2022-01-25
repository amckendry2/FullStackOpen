import axios from 'axios'
const baseUrl = '/api/login'

const getAllUsers = async () => {
	const res = await axios.get(baseUrl)
	return res.data
}

const login = async info => {
	const res = await axios.post(baseUrl, info)
	return res.data
}

const exports = { login, getAllUsers }

export default exports