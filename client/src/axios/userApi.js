import { makeRequest } from "../axios"

const loginUser = async ({ username, password }) => {
  try {
    const response = await makeRequest.post("auth/login", {
      username,
      password,
    })
    const data = await response.data

    localStorage.setItem("accessToken", data.accessToken)
    localStorage.setItem("user", JSON.stringify(data.user))

    return data
  } catch (error) {
    // Handle error if needed
    console.error("Error occurred while logging in:", error)
    throw error
  }
}

const registerUser = async (formData) => {
  try {
    const response = await makeRequest.post("auth/register", formData, {
      withCredentials: true,
    })
    const data = await response.data

    return data
  } catch (error) {
    console.error("Error occurred while registration:", error)
    throw error
  }
}
const getUserInfo = async () => {
  const result = await makeRequest
    .get("users")
    .then((r) => r.data)
    .catch((e) => e.message)
  return result
}

const addPost = async (newPost) => {
  const result = await makeRequest
    .post("/posts", newPost)
    .then((r) => r.data)
    .catch((e) => e.message)
  return result
}
// const tokenization = async () => {
//   const result = await makeRequest
//     .get("auth/refresh")
//     .then((r) => r.data)
//     .catch((e) => e.message)
//   // localStorage.setItem("accessToken", result.token)
//   // localStorage.setItem("refreshToken", result.refreshToken)
//   return result
// }

const authRoute = {
  loginUser,
  registerUser,
  getUserInfo,
  addPost,
  // tokenization,
}
export default authRoute
