import Post from "../post/Post"
import "./posts.scss"

const Posts = ({ userId, posts }) => {
  return (
    <div className="posts">
      {posts && posts.length !== 0 ? (
        posts.map((post) => <Post post={post} key={post.id} />)
      ) : (
        <span>no posts</span>
      )}
    </div>
  )
}

export default Posts
