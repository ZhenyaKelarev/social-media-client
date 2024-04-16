import { makeRequest } from "axios.js"
import { performRequest } from "utils/request"

const addStory = async (newStory) => {
  return performRequest(makeRequest.post, "/stories", newStory)
}

const getStories = async () => {
  return performRequest(makeRequest.get, "/stories")
}

const storyRoute = { addStory, getStories }
export default storyRoute
