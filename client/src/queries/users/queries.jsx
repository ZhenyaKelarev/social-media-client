import usersRoute from "."
import { useQuery } from "@tanstack/react-query"

const QUERY_KEYS = {
  ALL_USERS: "allUsers",
  USER_INFO: "userInfo",
  UPDATE_USER_INFO: "updateUserInfo",
}

const useGetAllUsers = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ALL_USERS, userId],
    queryFn: () => usersRoute.getAllUsers(userId),
  })
}

const useGetUserInfo = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_INFO, userId],
    queryFn: () => usersRoute.getUserInfo(userId),
  })
}

export { useGetAllUsers, useGetUserInfo }
