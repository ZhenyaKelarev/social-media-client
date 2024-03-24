import React from "react"
import { Link } from "react-router-dom"
import NotFoundImage from "../../assets/404image.avif"
import "./styles.scss"

const Page404 = () => {
  return (
    <div className="not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for could not be found.</p>
      <img src={NotFoundImage} alt="404" />
      <Link className="button" to="/">
        Back to home page
      </Link>
    </div>
  )
}

export default Page404
