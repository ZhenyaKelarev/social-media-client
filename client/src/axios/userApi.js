import { makeRequest } from "../axios"

const loginUser = async ({ username, password }) => {
  const result = await makeRequest
    .post("auth/login", { username, password })
    .then((r) => r.data)
    .then((data) => {
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("user", JSON.stringify(data.user))
      if (data.accessToken) {
        window.location.href = "/"
      }
      return data
    })
    .catch((e) => e.message)
  return result
}

const registerUser = async (formData) => {
  const result = makeRequest
    .post("auth/register", formData, {
      withCredentials: true,
    })
    .then((r) => r.data)
    .catch((e) => e.message)
  return result
}
const getUserInfo = async () => {
  const result = await makeRequest
    .get("users")
    .then((r) => r.data)
    .catch((e) => e.message)
  return result
}

const deletePost = async (postId, config) => {
  const result = await makeRequest
    .delete("/posts/" + postId, config)
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
  deletePost,
  addPost,
  // tokenization,
}
export default authRoute
