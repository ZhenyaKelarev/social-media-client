import React from "react"
import { useContext } from "react"
import { AuthContext } from "context/authContext"
import { getImage } from "utils/fileManipulation"
import { SuggestionSkeleton } from "../../Skeleton/SuggestionSkeleton"
import { useGetAllFriends } from "queries/relation/queries"

const Friends = () => {
  const { currentUser } = useContext(AuthContext)

  const userId = currentUser.id

  const {
    isLoading: isFriendsIsLoading,
    isError: isFriendsIsError,
    data: friends,
  } = useGetAllFriends(userId)

  if (isFriendsIsError) return <h1>error...</h1>

  return (
    <div className="item">
      <span>My Friends</span>
      {isFriendsIsLoading ? (
        <SuggestionSkeleton />
      ) : (
        friends?.map((friend) => {
          return (
            <div key={friend.id} className="user">
              <div className="userInfo">
                <img src={getImage(friend.profilePic)} alt="avatar" />
                <div className="online" />
                <span>{friend.name}</span>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default Friends
