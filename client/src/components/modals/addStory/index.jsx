import "./style.scss"
import React, { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { makeRequest } from "../../../axios"

function AddStory({ setOpenUpdate, userId }) {
  console.log(userId)
  const [cover, setCover] = useState(null)

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

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newStory) => {
      return makeRequest.post("/stories", newStory)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["stories"] })
    },
  })

  const handleClick = async (e) => {
    e.preventDefault()
    let coverUrl

    coverUrl = await upload(cover)

    mutation.mutate({ img: coverUrl })
    setOpenUpdate(false)
  }

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Add story</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Story Picture</span>
              <div className="imgContainer">
                <img src={cover ? URL.createObjectURL(cover) : null} alt="" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
          </div>
          <button onClick={handleClick}>Add story</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  )
}

export default AddStory
