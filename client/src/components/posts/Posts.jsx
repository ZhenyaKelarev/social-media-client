import Post from "../post/Post"
import { useQuery } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { useGetPosts } from "./Services/queries"
import Loader from "../Loader"

import "./posts.scss"

const Posts = ({ userId }) => {
  const onSuccess = (data) => {
    console.log("success data", data)
  }

  const onError = (error) => {
    console.log("error data", error)
  }
  const {
    data: posts,
    isLoading,
    isError,
  } = useGetPosts(userId, onSuccess, onError)

  if (isLoading) return <Loader />

  if (isError) return <h1>Something went wrong</h1>

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  )
}

export default Posts
