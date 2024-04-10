import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import { AuthContext } from "../../context/authContext"
import { useContext } from "react"
import Loader from "../../components/Loader"
import { useGetPosts } from "queries/posts/queries"
import "./home.scss"

const Home = () => {
  const { currentUser } = useContext(AuthContext)

  const { data: posts, isLoading, isError } = useGetPosts(currentUser.id)

  // console.log("posts", posts)

  return (
    <div className="home">
      <Stories userId={currentUser.id} />
      <Share />
      {isLoading ? <Loader /> : <Posts userId={currentUser.id} posts={posts} />}
    </div>
  )
}

export default Home
