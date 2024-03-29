import { makeRequest } from "axios.js"

const updateUser = async (user) => {
  const result = await makeRequest
    .put("users", user)
    .then((r) => r.data)
    .catch((e) => e.message)
  return result
}

const profileRoute = {
  updateUser,
}

export default profileRoute
