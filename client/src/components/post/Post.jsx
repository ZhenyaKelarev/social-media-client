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
import { useDeletePost, useAddDeleteLike } from "queries/posts/queries"
import { getImage } from "utils/fileManipulation"
import { useDebouncedCallback } from "use-debounce"
import "./post.scss"

const Post = ({ post }) => {
  const { currentUser } = useContext(AuthContext)
  const [commentOpen, setCommentOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLike = () => {
    addDeleteLike.mutate({
      liked: post.likes.includes(currentUser.id),
      postId: post.id,
    })
  }

  const debouncedLike = useDebouncedCallback((id) => {
    if (id) {
      handleLike(post.id)
    }
    handleLike()
  }, 300)

  const deletePost = useDeletePost()
  const addDeleteLike = useAddDeleteLike()

  const handleDelete = () => {
    deletePost.mutate(post.id)
  }

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
          {post.img && <img src={post.img} alt="" />}
        </div>
        <div className="info">
          <div className="item">
            {post.likes.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                onClick={() => debouncedLike(post.id)}
                style={{ color: "red" }}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={() => debouncedLike()} />
            )}
            {post.likes?.length} likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {post.comment?.length} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments data={post.comment} postId={post.id} />}
      </div>
    </div>
  )
}

export default Post
