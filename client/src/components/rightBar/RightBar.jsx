import "./rightBar.scss"
import { useContext } from "react"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { makeRequest } from "axios.js"
import { AuthContext } from "../../context/authContext"
import {
  SkeletonButton,
  SuggestionSkeleton,
} from "./Skeleton/SuggestionSkeleton"
import Suggestions from "./components/Suggestions"

const RightBar = () => {
  const queryClient = useQueryClient()
  const { currentUser } = useContext(AuthContext)

  const userId = currentUser.id

  const {
    isLoading: isFriendsIsLoading,
    isError: isFriendsIsError,
    data: friends,
  } = useQuery({
    queryKey: ["allFriends", userId],
    queryFn: () =>
      makeRequest
        .get(`/users/allFriends?userId=${userId}`)
        .then((res) => res.data),
  })

  if (isFriendsIsError) return <h1>error...</h1>

  return (
    <div className="rightBar">
      <div className="container">
        <Suggestions />
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>My Friends</span>
          {isFriendsIsLoading ? (
            <SuggestionSkeleton />
          ) : (
            friends?.map((friend) => {
              return (
                <div key={friend.id} className="user">
                  <div className="userInfo">
                    <img
                      src={
                        friend.profilePic
                          ? "/upload/" + friend.profilePic
                          : "/upload/defaultAvatar.jpeg"
                      }
                      alt="avatar"
                    />
                    <div className="online" />
                    <span>{friend.name}</span>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default RightBar
