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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { AuthContext } from "../../context/authContext"
import authRoute from "../../axios/userApi"
import { getImage } from "utils/fileManipulation"

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { currentUser } = useContext(AuthContext)

  const { isLoading, isError, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId=" + post.id).then((res) => res.data),
  })

  const { isLoading: isCommentsLoading, data: comments } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + post.id).then((res) => res.data),
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id)
      return makeRequest.post("/likes", { postId: post.id })
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["likes"] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return authRoute.deletePost(postId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  // const deleteMutation = useMutation({
  //   mutationFn: (postId) => {
  //     return makeRequest.delete("/posts/" + postId)
  //   },
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ["posts"] })
  //   },
  // })
  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id))
  }

  const handleDelete = () => {
    deleteMutation.mutate(post.id)
  }

  if (isLoading || isCommentsLoading) return null

  if (isError) return <h1>Something went wrong</h1>

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={getImage(post.profilePic)} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
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
          <img src={getImage(post.img)} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data.length} likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {comments.length} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  )
}

export default Post
