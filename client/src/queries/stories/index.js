import { makeRequest } from "axios.js"
import { performRequest } from "utils/request"

const addStory = async (newStory) => {
  return performRequest(makeRequest.post, "/stories", newStory)
}

const storyRoute = { addStory }
export default storyRoute
