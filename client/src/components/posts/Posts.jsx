import Post from "../post/Post"
import "./posts.scss"
import { useQuery } from "@tanstack/react-query"
import { makeRequest } from "../../axios"

const Posts = () => {
  const { data, isLoading, error } = useQuery(["posts"], () =>
    makeRequest.get("/posts").then((res) => {
      return res.data
    })
  )

  return (
    <div className="posts">
      {data.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  )
}

export default Posts
