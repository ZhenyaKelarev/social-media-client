import relationRoute from "."
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"

const QUERY_KEYS = {
  RELATIONSHIP: "relationship",
  ALL_FRIENDS: "allFriends",
  ALL_USERS: "allUsers",
}

const useGetRelations = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RELATIONSHIP, userId],
    queryFn: () => relationRoute.getRelations(userId),
  })
}

const useGetAllFriends = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ALL_FRIENDS, userId],
    queryFn: () => relationRoute.getAllFriends(userId),
  })
}

const useFollowFriend = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ following, userId }) => {
      if (following) {
        return relationRoute.deleteFriend(userId)
      }
      return relationRoute.addFriend(userId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RELATIONSHIP] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ALL_FRIENDS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ALL_USERS] })
    },
  })
}

export { useGetRelations, useGetAllFriends, useFollowFriend }
