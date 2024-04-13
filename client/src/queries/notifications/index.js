import { makeRequest } from "axios.js"
import { performRequest } from "utils/request"

const getNotifications = async () => {
  return performRequest(makeRequest.get, `/notifications`)
}

const updateNotifications = () => {
  return performRequest(makeRequest.put, `/notifications`)
}

const addNotification = (newNotification) => {
  return performRequest(makeRequest.post, `/notifications`, newNotification)
}

const notificationRoute = {
  getNotifications,
  updateNotifications,
  addNotification,
}

export default notificationRoute
