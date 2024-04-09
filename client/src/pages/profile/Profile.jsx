import "./profile.scss"
import { useContext, useState } from "react"
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import InstagramIcon from "@mui/icons-material/Instagram"
import PinterestIcon from "@mui/icons-material/Pinterest"
import TwitterIcon from "@mui/icons-material/Twitter"
import PlaceIcon from "@mui/icons-material/Place"
import LanguageIcon from "@mui/icons-material/Language"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import Posts from "../../components/posts/Posts"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { AuthContext } from "../../context/authContext"
import { useLocation } from "react-router-dom"
import Update from "../../components/update/update"
import ErrorMessage from "../../components/error"
import { getImage } from "utils/fileManipulation"
import { useGetRelations, useFollowFriend } from "queries/relation/queries"
import { useGetUserInfo } from "queries/users/queries"
import { useGetUserPosts } from "queries/posts/queries"

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false)
  const { currentUser } = useContext(AuthContext)
  const userId = parseInt(useLocation().pathname.split("/")[2])

  const { isLoading, data, isError, error } = useGetUserInfo(userId)

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = useGetUserPosts(userId)

  const {
    data: relationshipData,
    isLoading: relationshipIsLoading,
    isError: isRelationError,
  } = useGetRelations(userId)

  const followFriend = useFollowFriend()

  const handleFollow = () => {
    followFriend.mutate({
      following: relationshipData.includes(currentUser.id),
      userId,
    })
  }

  if (isLoading || relationshipIsLoading || isPostsLoading)
    return <h1>Loading...</h1>

  if (isError || isRelationError || isPostsError)
    return <ErrorMessage message={error.response.data} />

  return (
    <div className="profile">
      <div className="images">
        <img src={getImage(data.coverPic)} alt="" className="cover" />
        <img src={getImage(data.profilePic)} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{data.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data.city || "no location"}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{data.website || "no website"}</span>
              </div>
            </div>
            {userId === currentUser.id ? (
              <button onClick={() => setOpenUpdate(true)}>Update</button>
            ) : (
              <button onClick={handleFollow}>
                {relationshipData.includes(currentUser.id)
                  ? "Following"
                  : "Follow"}
              </button>
            )}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>

        <Posts userId={userId} posts={posts} />
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  )
}

export default Profile
