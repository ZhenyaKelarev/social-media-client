import { useContext, useState } from "react"
import "./stories.scss"
import { useQuery } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { AuthContext } from "../../context/authContext"
import AddStory from "../../components/modals/addStory"

const Stories = ({ userId }) => {
  const { currentUser } = useContext(AuthContext)
  const [openModal, setOpenModal] = useState(false)

  const {
    isLoading,
    isError,
    data: stories,
  } = useQuery({
    queryKey: ["stories"],
    queryFn: () =>
      makeRequest.get("/stories?userId=" + userId).then((res) => res.data),
  })

  if (isLoading) return <h1>Loading...</h1>

  if (isError) return <h1>Something went wrong</h1>

  return (
    <div className="stories">
      <div className="story">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <button onClick={() => setOpenModal(true)}>+</button>
      </div>
      {openModal && (
        <AddStory setOpenUpdate={setOpenModal} userId={currentUser.id} />
      )}
      {stories?.map((story) => (
        <div className="story" key={story.id}>
          <img src={"/upload/" + story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories
