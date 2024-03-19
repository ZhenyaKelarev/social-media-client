import { useContext } from "react"
import "./comments.scss"
import { useQuery } from "@tanstack/react-query"
import { AuthContext } from "../../context/authContext"
import moment from "moment"
import { makeRequest } from "../../axios"

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext)

  const {
    isLoading,
    isError,
    data: comments,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + postId).then((res) => res.data),
  })

  if (isLoading) return <h1>Loading...</h1>

  if (isError) return <h1>Something went wrong</h1>

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment" />
        <button>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img src={comment.profilePicture} alt="" />
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
