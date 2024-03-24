import { useMutation, useQueryClient } from "@tanstack/react-query"
import profileRoute from "./index"

const useUpdateProfilePut = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (user) => profileRoute.updateUser(user),
    onSuccess: () => {
      console.log("work 2")
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
    onError: () => {
      console.log("work 2")
    },
  })
}

export { useUpdateProfilePut }
