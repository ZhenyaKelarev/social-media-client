import { useContext, useState } from "react"
import { AuthContext } from "../../context/authContext"
import { getImage } from "utils/fileManipulation"
import { useAddComment } from "queries/posts/queries"
import moment from "moment"
import { useForm } from "react-hook-form"
import "./comments.scss"

const Comments = ({ postId, data }) => {
  const { currentUser } = useContext(AuthContext)
  const [desc, setDesc] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resetOptions: {
      keepDirtyValues: true, // user-interacted input will be retained
      keepErrors: true, // input errors will be retained with value update
    },
  })
  const addComment = useAddComment()

  const handleClick = async (data) => {
    addComment.mutate({ desc, postId })
    setDesc("")
  }

  return (
    <div className="comments">
      <div className="write">
        <img src={getImage(currentUser.profilePic)} alt="avatar" />
        <form onSubmit={handleSubmit(handleClick)}>
          <input
            {...register("comment", {
              required: "comment is required!",
              minLength: {
                value: 1,
                message: "comment has been minimum 1 symbols",
              },
            })}
            value={desc}
            type="text"
            name="comment"
            placeholder="write a comment"
            onChange={(e) => setDesc(e.target.value)}
          />
          {errors.comment && (
            <p className="form-warning">{errors.comment.message}</p>
          )}
          <button type="sumbit">Send</button>
        </form>
      </div>
      {data.map((comment) => (
        <div key={comment.id} className="comment">
          <img src={getImage(comment.user.profilePic)} alt="" />
          <div className="info">
            <span>{comment.user.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  )
}

export default Comments
