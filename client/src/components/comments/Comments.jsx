import { useContext, useState } from "react"
import "./comments.scss"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { AuthContext } from "../../context/authContext"

import { makeRequest } from "../../axios"
import moment from "moment"

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext)
  const [desc, setDesc] = useState("")

  const {
    isLoading,
    isError,
    data: comments,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + postId).then((res) => res.data),
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["comments"] })
    },
  })

  const handleClick = async (e) => {
    e.preventDefault()
    mutation.mutate({ desc, postId })
    setDesc("")
  }

  if (isLoading) return <h1>Loading...</h1>

  if (isError) return <h1>Something went wrong</h1>

  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <input
          value={desc}
          type="text"
          placeholder="write a comment"
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img src={"/upload/" + comment.profilePic} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  )
}

export default Comments
