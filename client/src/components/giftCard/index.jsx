import React from "react"
import moment from "moment"
import { getImage } from "utils/fileManipulation"
import "./styles.scss"

const GiftCard = ({ gift }) => {
  return (
    <div className="flip-card gift-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="flip-card-gift">
            <img src={getImage(gift.giftCard.img)} alt="avatar" />
          </div>
        </div>
        <div className="flip-card-back">
          <p className="title">{gift.giftText}</p>
          <p>from {gift.gifter.name}</p>
          <p>{moment(gift.createdAt).format("DD.MM.YYYY")}</p>
        </div>
      </div>
    </div>
  )
}

export default GiftCard
