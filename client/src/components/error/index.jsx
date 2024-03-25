import { Link } from "react-router-dom"
import NotFoundImage from "assets/notFoundImage.webp"
import "./styles.scss"

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-block">
      <h1>{message}</h1>
      <img src={NotFoundImage} alt="" />
      <Link className="button" to="/">
        Back to home page
      </Link>
    </div>
  )
}

export default ErrorMessage
