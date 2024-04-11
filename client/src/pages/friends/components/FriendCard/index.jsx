import React, { useState } from "react"
import { getImage } from "utils/fileManipulation"
import { Link } from "react-router-dom"
import MenuSimple from "components/contextMenu"
import { useFollowFriend } from "queries/relation/queries"
import { useNavigate } from "react-router-dom"

import SubmitSimpleModal from "components/modals/submitModal"
import "./style.scss"

const FriendCard = ({ friendData }) => {
  const [removeFriendModal, setRemoveFriendModal] = useState(false)
  const followFriend = useFollowFriend()
  const navigate = useNavigate()
  const handleRemoveFriendModal = () => {
    setRemoveFriendModal((prev) => !prev)
  }

  const handleGiftModal = () => {
    navigate("/marketplace")
  }

  const handleApply = () => {
    followFriend.mutate({ following: true, userId: friendData.id })
    handleRemoveFriendModal()
  }

  const contextMenuItems = [
    {
      text: "Send gift",
      handler: handleGiftModal,
    },
    {
      text: "Delete friend",
      handler: handleRemoveFriendModal,
    },
  ]
  return (
    <div className="friend-card">
      <Link className="friend-info" to={`/profile/${friendData.id}`}>
        <img src={getImage(friendData.profilePic)} alt="default avatar" />
        <span>{friendData.name}</span>
      </Link>
      <MenuSimple items={contextMenuItems} />
      <SubmitSimpleModal
        openModal={removeFriendModal}
        closeModal={handleRemoveFriendModal}
        title={`Are you sure delete ${friendData.name} ?`}
        handleCancel={handleRemoveFriendModal}
        handleApply={handleApply}
        applyText="remove"
        cancelText="cancel"
      />
    </div>
  )
}

export default FriendCard
