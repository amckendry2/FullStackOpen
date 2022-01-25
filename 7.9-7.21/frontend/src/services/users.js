import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = async () => {
	const res = await axios.get(baseUrl)
	return res.data
}

const exports = {  getAllUsers }

export default exports