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

const addFriend = async (userId) => {
  return performRequest(makeRequest.post, "/relationships", { userId })
}

const deleteFriend = async (userId) => {
  return performRequest(makeRequest.delete, `/relationships?userId=${userId}`)
}

const relationRoute = {
  getRelations,
  getAllFriends,
  deleteFriend,
  addFriend,
}

export default relationRoute
