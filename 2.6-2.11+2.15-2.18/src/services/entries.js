import axios from 'axios';
const baseUrl = "entries";

const getAll = () => 
    axios.get(baseUrl).then(res => res.data)

const create = obj => 
    axios.post(baseUrl, obj).then(res=>res.data)

const update = (id, obj) => 
    axios.put(`${baseUrl}/${id}`, obj).then(res=>res.data)

const remove = id => 
    axios.delete(`${baseUrl}/${id}`)

const api = {getAll, create, update, remove}
export default api;