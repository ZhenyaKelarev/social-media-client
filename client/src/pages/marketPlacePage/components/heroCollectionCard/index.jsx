import React, { useState } from "react"
import { getImage } from "utils/fileManipulation"
import MarketPlaceModal from "components/modals/marketplaceModal"
import "./style.scss"

const HeroCollectionCard = ({ cardData }) => {
  const [productModal, setProductModal] = useState(false)

  return (
    <>
      <div className="marketplace-card" onClick={() => setProductModal(true)}>
        <div class="card">
          <div class="card__content">
            <img src={getImage(cardData.img)} alt="avatar" />
          </div>
        </div>
      </div>
      <MarketPlaceModal
        openModal={productModal}
        closeModal={() => setProductModal(false)}
        marketplaceItem={cardData}
      />
    </>
  )
}

export default HeroCollectionCard
