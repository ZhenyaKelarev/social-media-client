import React, { useContext } from "react"
import Loader from "components/Loader"
import { useQuery } from "@tanstack/react-query"
import { makeRequest } from "axios.js"
import FriendCard from "./components/FriendCard"
import { AuthContext } from "../../context/authContext"
import "./style.scss"

const Friends = () => {
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

  if (isFriendsIsLoading) return <Loader />

  if (isFriendsIsError) return <h1>error...</h1>

  console.log("friends", friends)
  return (
    <div className="friends-page">
      <h1>Friends</h1>
      {friends.map((friend) => (
        <FriendCard friendData={friend} />
      ))}
    </div>
  )
}

export default Friends
