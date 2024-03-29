import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import storyRoute from "."

const QUERY_KEYS = {
  STORIES: "stories",
}

const useAddStory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newStory) => storyRoute.addStory(newStory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STORIES] })
    },
  })
}

export { useAddStory }
