import { makeRequest } from "axios.js"
import { performRequest } from "utils/request"

const getRelations = async (userId) => {
  return performRequest(
    makeRequest.get,
    `/relationships?followedUserId=${userId}`
  )
}

const getAllFriends = async (userId) => {
  return performRequest(makeRequest.get, `/users/allFriends?userId=${userId}`)
}

const relationRoute = {
  getRelations,
  getAllFriends,
}

export default relationRoute
