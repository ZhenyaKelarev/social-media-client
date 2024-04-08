import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import postRoute from "."

const QUERY_KEYS = {
  POSTS: "posts",
  LIKES: "likes",
  COMMENTS: "comments",
}

const useGetPosts = (userId) => {
  return useQuery({
    queryKey: ["getPosts", userId],
    queryFn: () => postRoute.getPosts(userId),
  })
}

const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (postId) => postRoute.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] })
    },
  })
}

const useAddNewPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newPost) => postRoute.addPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] })
    },
  })
}

const useGetLikes = (postId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.LIKES, postId],
    queryFn: () => postRoute.getLikes(postId),
  })
}

const useAddDeleteLike = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ liked, postId }) => {
      if (liked) return postRoute.deleteLike(postId)
      return postRoute.addLike(postId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LIKES] })
    },
  })
}

const useGetComments = (postId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.COMMENTS, postId],
    queryFn: () => postRoute.getComments(postId),
  })
}

const useAddComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newComment) => postRoute.addComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMENTS] })
    },
  })
}

export {
  useGetPosts,
  useDeletePost,
  useAddNewPost,
  useAddDeleteLike,
  useGetComments,
  useAddComment,
  useGetLikes,
}
