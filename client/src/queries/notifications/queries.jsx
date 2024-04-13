import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import notificationRoute from "."

const QUERY_KEYS = {
  GET_NOTIFICATION: "getNotifications",
}

const useGetNotifications = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_NOTIFICATION],
    queryFn: () => notificationRoute.getNotifications(),
  })
}

const useAddNotification = () => {
  return useMutation({
    mutationFn: (newNotification) =>
      notificationRoute.addNotification(newNotification),
  })
}

const useUpdateNotifications = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newPost) => notificationRoute.updateNotifications(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_NOTIFICATION] })
    },
  })
}

export { useGetNotifications, useUpdateNotifications, useAddNotification }
