import { makeRequest } from "axios.js"
import { performRequest } from "utils/request"

const getGifts = async () => {
  return performRequest(makeRequest.get, `/gifts`)
}

const deleteGift = async (postId, config) => {
  return performRequest(makeRequest.delete, "/gifts/" + postId, config)
}

const sendGift = async (newPost) => {
  return performRequest(makeRequest.post, "/gifts", newPost)
}

const postRoute = {
  getGifts,
  deleteGift,
  sendGift,
}

export default postRoute