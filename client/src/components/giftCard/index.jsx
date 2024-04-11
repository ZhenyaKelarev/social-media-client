import React from "react"
import moment from "moment"
import { getImage } from "utils/fileManipulation"
import "./styles.scss"

const GiftCard = ({ gift }) => {
  return (
    <div class="flip-card gift-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <div className="flip-card-gift">
            <img src={getImage(gift.img)} alt="avatar" />
          </div>
        </div>
        <div class="flip-card-back">
          <p class="title">{gift.giftText}</p>
          <p>from {gift.user.name}</p>
          <p>{moment(gift.createdAt).format("DD.MM.YYYY")}</p>
        </div>
      </div>
    </div>
  )
}

export default GiftCard
