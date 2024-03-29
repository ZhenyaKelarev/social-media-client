import "./update.scss"
import React, { useState, useContext } from "react"
import { AuthContext } from "../../context/authContext"
import { upload } from "../../utils/fileManipulation"
import { useUpdateProfilePut } from "../../pages/profile/Services/queries"
import { getImage } from "../../utils/fileManipulation"

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

  const updateProfile = useUpdateProfilePut()

  const handleClick = async (e) => {
    e.preventDefault()
    let coverUrl
    let profileUrl

    coverUrl = cover ? await upload(cover) : user.coverPic
    profileUrl = profile ? await upload(profile) : user.profilePic

    const updatedUser = {
      ...currentUser,
      ...texts,
      coverPic: coverUrl,
      profilePic: profileUrl,
    }

    await updateProfile.mutateAsync(
      {
        ...texts,
        coverPic: coverUrl,
        profilePic: profileUrl,
      },
      {
        onSuccess: () => {
          setOpenUpdate(false)
          setCurrentUser(updatedUser)
          localStorage.setItem("user", JSON.stringify(updatedUser))
        },
        onError: () => {
          console.log("error")
        },
      }
    )

    setOpenUpdate(false)
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
                {/* <CloudUploadIcon className="icon" /> */}
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>

          {/* <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            value={texts.password}
            name="password"
            onChange={handleChange}
          /> */}
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
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  )
}

export default Update
