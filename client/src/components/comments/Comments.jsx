import { useContext, useState } from "react"
import { AuthContext } from "../../context/authContext"
import { getImage } from "utils/fileManipulation"
import { useAddComment } from "components/post/Services/queries"
import moment from "moment"
import "./comments.scss"

const Comments = ({ postId, data }) => {
  const { currentUser } = useContext(AuthContext)
  const [desc, setDesc] = useState("")

  const addComment = useAddComment()

  const handleClick = async (e) => {
    e.preventDefault()
    addComment.mutate({ desc, postId })
    setDesc("")
  }

  return (
    <div className="comments">
      <div className="write">
        <img src={getImage(currentUser.profilePic)} alt="" />
        <input
          value={desc}
          type="text"
          placeholder="write a comment"
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {data.map((comment) => (
        <div key={comment.id} className="comment">
          <img src={getImage(comment.profilePic)} alt="" />
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
