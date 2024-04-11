import React from "react"
import { getImage } from "utils/fileManipulation"
import "./style.scss"

const HeroCollectionCard = ({ cardData }) => {
  console.log("cardData", cardData)
  return (
    <div>
      <div class="card">
        <div class="card__content">
          <img src={getImage(cardData.img)} alt="avatar" />
        </div>
      </div>
    </div>
  )
}

export default HeroCollectionCard
