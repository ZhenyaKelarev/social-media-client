import { makeRequest } from "axios.js"
import { performRequest } from "utils/request"

const getPosts = async (userId) => {
  return performRequest(makeRequest.get, `/posts?userId=${userId}`)
}

const getUserPosts = async (userId) => {
  return performRequest(makeRequest.get, `/posts/userPosts?userId=${userId}`)
}

const deletePost = async (postId, config) => {
  return performRequest(makeRequest.delete, "/posts/" + postId, config)
}

const addPost = async (newPost) => {
  return performRequest(makeRequest.post, "/posts", newPost)
}

const getLikes = async (postId) => {
  return performRequest(makeRequest.get, `/likes?postId=${postId}`)
}

const addLike = async (postId) => {
  return performRequest(makeRequest.post, "/likes", { postId: postId })
}

const deleteLike = async (postId) => {
  return performRequest(makeRequest.delete, `/likes?postId=${postId}`)
}

const getComments = async (postId) => {
  return performRequest(makeRequest.get, `/comments?postId=${postId}`)
}

const addComment = async (newComment) => {
  return performRequest(makeRequest.post, "/comments", newComment)
}

const postRoute = {
  getPosts,
  getUserPosts,
  deletePost,
  addPost,
  getLikes,
  deleteLike,
  addLike,
  getComments,
  addComment,
}

export default postRoute
