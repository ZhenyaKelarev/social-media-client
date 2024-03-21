import Post from "../post/Post"
import { useQuery } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import "./posts.scss"

const Posts = ({ userId }) => {
  const {
    isLoading,
    isError,
    data: posts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      makeRequest.get("/posts?userId=" + userId).then((res) => res.data),
  })

  console.log("posts", posts)

  if (isLoading) return <h1>Loading...</h1>

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
