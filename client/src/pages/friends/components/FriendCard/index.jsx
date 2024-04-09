import React, { useState } from "react"
import { getImage } from "utils/fileManipulation"
import { Link } from "react-router-dom"
import MenuSimple from "components/contextMenu"
import { useFollowFriend } from "queries/relation/queries"

import "./style.scss"
import SubmitSimpleModal from "components/modals/submitModal"

const FriendCard = ({ friendData }) => {
  const [removeFriendModal, setRemoveFriendModal] = useState(false)
  const [giftModal, setGiftModal] = useState(false)
  const followFriend = useFollowFriend()
  const handleRemoveFriendModal = () => {
    setRemoveFriendModal((prev) => !prev)
  }

  const handleGiftModal = () => {
    setGiftModal((prev) => !prev)
  }

  const handleApply = () => {
    followFriend.mutate({ following: true, userId: friendData.id })
    handleRemoveFriendModal()
  }

  const contextMenuItems = [
    {
      text: "Delete friend",
      handler: handleRemoveFriendModal,
    },
    {
      text: "Gift",
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
