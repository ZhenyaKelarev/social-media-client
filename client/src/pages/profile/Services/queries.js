import { useMutation, useQueryClient } from "@tanstack/react-query"
import profileRoute from "./index"

const useUpdateProfilePut = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (user) => profileRoute.updateUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] })
    },
    onError: (err) => {
      console.log("err", err)
    },
  })
}

export { useUpdateProfilePut }
