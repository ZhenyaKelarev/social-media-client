import { useContext } from "react"
import "./stories.scss"
import { useQuery } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { AuthContext } from "../../context/authContext"

const Stories = ({ userId }) => {
  const { currentUser } = useContext(AuthContext)

  const {
    isLoading,
    isError,
    data: stories,
  } = useQuery({
    queryKey: ["stories"],
    queryFn: () => makeRequest.get("/stories").then((res) => res.data),
  })

  const {
    isLoading: usersIsLoading,
    isError: usersIsError,
    data: users,
  } = useQuery({
    queryKey: ["allUsers", userId],
    queryFn: () =>
      makeRequest
        .get(`/users/allUsers?userId=${userId}`)
        .then((res) => res.data),
  })

  if (isLoading || usersIsLoading) return <h1>Loading...</h1>

  if (isError || usersIsError) return <h1>Something went wrong</h1>

  return (
    <div className="stories">
      <div className="story">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories?.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories
