import { useQuery } from "@tanstack/react-query"
import marketplaceRoute from "."

const QUERY_KEYS = {
  GET_CARD_COLLECTION: "getCardCollection",
}

const useGetCardCollection = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CARD_COLLECTION],
    queryFn: () => marketplaceRoute.getCardCollection(),
  })
}

export { useGetCardCollection }
