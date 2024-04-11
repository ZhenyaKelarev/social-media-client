import React from "react"
import { useGetGifts } from "queries/gifts/queries"
import Loader from "components/Loader"
import GiftCard from "components/giftCard"
import "./style.scss"

const GiftPage = () => {
  const { data: gifts, isLoading, isError } = useGetGifts()

  if (isLoading) return <Loader />

  return (
    <div>
      <h1>Gifts</h1>
      <div className="gifts-collection">
        {gifts.length > 0 ? (
          gifts.map((gift) => <GiftCard key={gift.id} gift={gift} />)
        ) : (
          <h1>No gifts</h1>
        )}
      </div>
    </div>
  )
}

export default GiftPage
