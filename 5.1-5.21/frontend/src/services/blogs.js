import axios from 'axios'
const baseUrl = '/api/blogs'

const tokenConfig = token => ({ headers: { Authorization: `bearer ${ token }` } })

const getAll = async () => {
	const request = await axios.get(baseUrl)
	return request.data
}

const postNew = async (data, token) => {
	const res = await axios.post(baseUrl, data, tokenConfig(token))
	return res.data
}

const addLike = async data => {
	const res = await axios.put(`${baseUrl}/${data.id}`, data)
	return res.data
}

const deleteBlog = async (data, token) => {
	const res = await axios.delete(`${baseUrl}/${data.id}`, tokenConfig(token))
	return res.data
}

const exports = { getAll, postNew, addLike, deleteBlog }

export default exports