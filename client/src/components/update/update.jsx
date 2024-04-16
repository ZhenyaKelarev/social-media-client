import React, { useState, useContext } from "react"
import { AuthContext } from "../../context/authContext"
import { useUpdateProfilePut } from "../../pages/profile/Services/queries"
import { getImage } from "../../utils/fileManipulation"
import Loader from "components/Loader"
import "./update.scss"

function Update({ setOpenUpdate, user }) {
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const [cover, setCover] = useState(null)
  const [profile, setProfile] = useState(null)
  const [texts, setTexts] = useState({
    name: user.name,
    city: user.city,
    website: user.website,
  })

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const { mutateAsync, isPending } = useUpdateProfilePut()

  const handleClick = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    if (cover) formData.append("cover", cover)
    if (profile) formData.append("profile", profile)

    formData.append("texts", JSON.stringify(texts))
    formData.append("currentUser", JSON.stringify(currentUser))

    await mutateAsync(formData, {
      onSuccess: (data) => {
        setCurrentUser(data)
        localStorage.setItem("user", JSON.stringify(data))
      },
      onError: () => {
        console.log("error")
      },
    })

    await setOpenUpdate(false)
  }

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover ? URL.createObjectURL(cover) : getImage(user.coverPic)
                  }
                  alt=""
                />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : getImage(user.profilePic)
                  }
                  alt=""
                />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />
          {isPending ? (
            <Loader />
          ) : (
            <button onClick={handleClick}>Update</button>
          )}
        </form>
        <button
          disabled={isPending}
          className="close"
          onClick={() => setOpenUpdate(false)}
        >
          close
        </button>
      </div>
    </div>
  )
}

export default Update
