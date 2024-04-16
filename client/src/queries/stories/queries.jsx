import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import storyRoute from "."

const QUERY_KEYS = {
  STORIES: "stories",
  GET_STORIES: "getStories",
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

const useGetStories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STORIES],
    queryFn: () => storyRoute.getStories(),
  })
}

export { useAddStory, useGetStories }
