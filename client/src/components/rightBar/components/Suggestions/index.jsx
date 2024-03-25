import React from "react"
import { useContext } from "react"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { makeRequest } from "axios.js"
import { AuthContext } from "../../../../context/authContext"
import "../../rightBar.scss"

import {
  SkeletonButton,
  SuggestionSkeleton,
} from "../../Skeleton/SuggestionSkeleton"
import "../../rightBar.scss"

const Suggestions = () => {
  const queryClient = useQueryClient()
  const { currentUser } = useContext(AuthContext)
  const userId = currentUser.id

  const {
    isLoading: usersIsLoading,
    isError,
    data: users,
  } = useQuery({
    queryKey: ["allUsers", userId],
    queryFn: () =>
      makeRequest
        .get(`/users/allUsers?userId=${userId}`)
        .then((res) => res.data),
  })

  const { isLoading: relationshipIsLoading, data: relationshipData } = useQuery(
    {
      queryKey: ["relationship", userId],
      queryFn: () =>
        makeRequest
          .get("/relationships?followedUserId=" + userId)
          .then((res) => res.data),
    }
  )

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
              {relationshipIsLoading ? (
                <SkeletonButton />
              ) : (
                <button onClick={() => handleFollow(user.id)}>
                  {relationshipData.includes(currentUser.id)
                    ? "Following"
                    : "Follow"}
                </button>
              )}

              <button>dismiss</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Suggestions
