import axios from 'axios'
const baseUrl = '/api/workouts'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }

  return axios.get(baseUrl,config)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  console.log('Workout API response:', response.data) // Debugging line ✅

  return response.data
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

// const update = (id, newObject) => {
//   const config = {
//     headers: { Authorization: token },
//   }

//   return axios.put(`${baseUrl}/${id}`, newObject, config)
// }

export default {
  getAll: getAll,
  create: create,
  update: update,
  setToken
}