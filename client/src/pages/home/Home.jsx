import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import { AuthContext } from "../../context/authContext"
import { useContext } from "react"
import "./home.scss"

const Home = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="home">
      <Stories />
      <Share />
      <Posts userId={currentUser.id} />
    </div>
  )
}

export default Home
