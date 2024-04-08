import React from "react"
import { getImage } from "utils/fileManipulation"
import { Link } from "react-router-dom"
import "./style.scss"

const FriendCard = ({ friendData }) => {
  return (
    <Link className="friend-card" to={`/profile/${friendData.id}`}>
      <img src={getImage(friendData.profilePic)} alt="default avatar" />
      <span>{friendData.name}</span>
    </Link>
  )
}

export default FriendCard
