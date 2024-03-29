import { makeRequest } from "../axios"
import DefaultAvatar from "../assets/defaultAvatar.jpeg"

const upload = async (file) => {
  try {
    const formData = new FormData()
    formData.append("file", file)
    const res = await makeRequest.post("/upload", formData)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const getImage = (fileName) => {
  const imagePath = fileName ? `/upload/${fileName}` : DefaultAvatar
  return imagePath
}

export { upload, getImage }
