import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import giftRoute from "."

const QUERY_KEYS = {
  GET_GIFTS: "getGifts",
  SEND_GIFT: "sendGift",
  DELETE_GIFT: "deleteGift",
}

const useGetGifts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_GIFTS],
    queryFn: () => giftRoute.getGifts(),
  })
}

const useSendGift = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (gift) => giftRoute.sendGift(gift),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_GIFTS] })
    },
  })
}

export { useGetGifts, useSendGift }
