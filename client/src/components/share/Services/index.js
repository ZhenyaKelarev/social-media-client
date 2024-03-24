import { useMutation, useQueryClient } from "@tanstack/react-query"
import authRoute from "../../../axios/userApi"

const useAddNewPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newPost) => authRoute.addPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}

export { useAddNewPost }
