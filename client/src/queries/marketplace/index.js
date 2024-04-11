import { makeRequest } from "axios.js"
import { performRequest } from "utils/request"

const getCardCollection = async () => {
  return performRequest(makeRequest.get, `/marketplace`)
}

const marketplaceRoute = {
  getCardCollection,
}

export default marketplaceRoute
