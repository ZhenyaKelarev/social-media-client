import "./style.scss"
import React, { useState } from "react"
import { makeRequest } from "axios.js"
import { useAddStory } from "components/stories/Services/queries"

function AddStory({ setOpenUpdate, userId }) {
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
  const addStory = useAddStory()

  const handleClick = async (e) => {
    e.preventDefault()
    let coverUrl

    coverUrl = await upload(cover)

    addStory.mutate({ img: coverUrl })
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
