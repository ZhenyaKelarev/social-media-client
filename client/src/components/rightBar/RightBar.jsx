import "./rightBar.scss"
import { useContext } from "react"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { AuthContext } from "../../context/authContext"

const RightBar = () => {
  const queryClient = useQueryClient()
  const { currentUser } = useContext(AuthContext)

  const userId = currentUser.id

  const { isLoading: relationshipIsLoading, data: relationshipData } = useQuery(
    {
      queryKey: ["relationship", userId],
      queryFn: () =>
        makeRequest
          .get("/relationships?followedUserId=" + userId)
          .then((res) => res.data),
    }
  )

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

  const {
    isLoading,
    isError,
    data: users,
  } = useQuery({
    queryKey: ["allUsers", userId],
    queryFn: () =>
      makeRequest
        .get(`/users/allUsers?userId=${userId}`)
        .then((res) => res.data),
  })

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following)
        // return makeRequest.delete("/relationships?userId=" + userId)
        return makeRequest.post("/relationships", { userId: following })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relationship"] })
    },
  })

  const handleFollow = (id) => {
    mutation.mutate(id)
  }

  if (isLoading || relationshipIsLoading || isFriendsIsLoading)
    return <h1>Loading...</h1>

  if (isError || isFriendsIsError) return <h1>error...</h1>

  const suggestionUsers = users.filter((user, id) => {
    if (user && id < 2) {
      return user
    }
  })

  console.log("friends", friends)

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {suggestionUsers.map((user) => {
            return (
              <div key={user.id} className="user">
                <div className="userInfo">
                  <img
                    src={
                      user.profilePic
                        ? "/upload/" + user.profilePic
                        : "/upload/defaultAvatar.jpeg"
                    }
                    alt="default avatar"
                  />
                  <span>{user.name}</span>
                </div>
                <div className="buttons">
                  <button onClick={() => handleFollow(user.id)}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                  <button>dismiss</button>
                </div>
              </div>
            )
          })}

          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>
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
          {friends?.map((friend) => {
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
          })}
        </div>
      </div>
    </div>
  )
}

export default RightBar
