import axios from 'axios'
const baseUrl = 'api/login'

const login = async info => {
	const res = await axios.post(baseUrl, info)
	return res.data
}

const exports = { login }

export default exports