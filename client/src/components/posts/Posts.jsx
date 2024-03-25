import Post from "../post/Post"
import { useQuery } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { useGetPosts } from "./Services/queries"
import Loader from "../Loader"

import "./posts.scss"

const Posts = ({ userId }) => {
  const { data: posts, isLoading, isError } = useGetPosts(userId)

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
