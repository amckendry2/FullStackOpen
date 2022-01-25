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
	const newData = { ...data, likes: data.likes + 1 }
	const res = await axios.put(`${baseUrl}/${newData.id}`, newData)
	return res.data
}

const addComment = async (data, comment) => {
	const res = await axios.post(`${baseUrl}/${data.id}/comments`, { comment: comment })
	return res.data
}

const deleteBlog = async (data, token) => {
	const res = await axios.delete(`${baseUrl}/${data.id}`, tokenConfig(token))
	return res.data
}

const exports = { getAll, postNew, addLike, deleteBlog, addComment }

export default exports