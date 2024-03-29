import { useQuery } from "@tanstack/react-query"
import postRoute from "./index"

const useGetPosts = (userId) => {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => postRoute.getPosts(userId),
  })
}

export { useGetPosts }
