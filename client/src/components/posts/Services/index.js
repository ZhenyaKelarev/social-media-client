import { makeRequest } from "../../../axios"

const getPosts = async (userId) => {
  const result = await makeRequest
    .get("/posts?userId=" + userId)
    .then((r) => r.data)
    .catch((e) => e.message)
  return result
}

const postRoute = {
  getPosts,
}

export default postRoute
