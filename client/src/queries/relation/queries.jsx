import relationRoute from "."
import { useQuery } from "@tanstack/react-query"

const QUERY_KEYS = {
  RELATIONSHIP: "relationship",
  ALL_FRIENDS: "allFriends",
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

export { useGetRelations, useGetAllFriends }
