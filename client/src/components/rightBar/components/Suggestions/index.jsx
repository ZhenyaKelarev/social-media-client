import React from "react"
import { useContext } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { makeRequest } from "axios.js"
import { AuthContext } from "context/authContext"
import { getImage } from "utils/fileManipulation"
import {
  SkeletonButton,
  SuggestionSkeleton,
} from "../../Skeleton/SuggestionSkeleton"
import { useGetAllUsers } from "queries/users/queries"
import { useGetRelations } from "queries/relation/queries"
import { useAddNotification } from "queries/notifications/queries"
import "../../rightBar.scss"

const Suggestions = () => {
  const queryClient = useQueryClient()
  const { currentUser } = useContext(AuthContext)
  const userId = currentUser.id

  const { isLoading: usersIsLoading, data: users } = useGetAllUsers(userId)
  const addNotification = useAddNotification()

  const { isLoading: relationshipIsLoading, data: relationshipData } =
    useGetRelations(userId)

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following)
        return makeRequest.post("/relationships", { userId: following })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relationship"] })
      queryClient.invalidateQueries({ queryKey: ["allUsers"] })
      queryClient.invalidateQueries({ queryKey: ["allFriends"] })
    },
  })

  const handleFollow = async (id) => {
    await mutation.mutateAsync(id)
    addNotification.mutate({
      eventText: "follows you",
      toUserId: id,
    })
  }

  if (usersIsLoading) return <SuggestionSkeleton />

  const suggestionUsers = users?.filter((user, id) => {
    if (user && id < 2) {
      return user
    }
  })

  return (
    <div className="item">
      <span>Suggestions For You</span>
      {suggestionUsers?.map((user) => {
        return (
          <div key={user.id} className="user">
            <div className="userInfo">
              <img src={getImage(user.profilePic)} alt="default avatar" />
              <span>{user.name}</span>
            </div>
            <div className="buttons">
              {relationshipIsLoading ? (
                <SkeletonButton />
              ) : (
                <button
                  className="btn-primary"
                  onClick={() => handleFollow(user.id)}
                >
                  {relationshipData.includes(currentUser.id)
                    ? "Following"
                    : "Follow"}
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Suggestions
