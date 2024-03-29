import "./post.scss"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined"
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { Link } from "react-router-dom"
import Comments from "../comments/Comments"
import { useState, useContext } from "react"
import moment from "moment"
import { AuthContext } from "../../context/authContext"
import {
  useDeletePost,
  useAddDeleteLike,
  useGetComments,
  useGetLikes,
} from "./Services/queries"
import { getImage } from "utils/fileManipulation"

const Post = ({ post }) => {
  const { currentUser } = useContext(AuthContext)
  const [commentOpen, setCommentOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { data, isLoading, isError } = useGetLikes(post.id)
  const { data: commentsData, isLoading: isCommentsLoading } = useGetComments(
    post.id
  )

  const deletePost = useDeletePost()
  const addDeleteLike = useAddDeleteLike()

  const handleLike = () => {
    addDeleteLike.mutate({
      liked: data.includes(currentUser.id),
      postId: post.id,
    })
  }

  const handleDelete = () => {
    deletePost.mutate(post.id)
  }

  if (isLoading || isCommentsLoading) return null

  if (isError) return <h1>Something went wrong</h1>

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={getImage(post.user.profilePic)} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.user.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <div className="context-menu">
            <button className="context-menu-button">
              <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
            </button>

            {menuOpen && post.userId === currentUser.id && (
              <button className="delete-button" onClick={handleDelete}>
                delete
              </button>
            )}
          </div>
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img && getImage(post.img)} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={() => handleLike(post.id)}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length} likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {commentsData?.length} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments data={commentsData} postId={post.id} />}
      </div>
    </div>
  )
}

export default Post
