import { makeRequest } from "axios.js"
import { performRequest } from "utils/request"

const getAllUsers = async (userId) => {
  return performRequest(makeRequest.get, `/users/allUsers?userId=${userId}`)
}

const getUserInfo = async (userId) => {
  return performRequest(makeRequest.get, `/users/find/${userId}`)
}

// const getUserInfo = async () => {
//   return performRequest(makeRequest.get, `/users`)
// }

const usersRoute = {
  getAllUsers,
  getUserInfo,
}

export default usersRoute
