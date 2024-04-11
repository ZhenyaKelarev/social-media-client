import React from "react"
import { useGetGifts } from "queries/gifts/queries"
import Loader from "components/Loader"
import GiftCard from "components/giftCard"

const GiftPage = () => {
  const { data: gifts, isLoading, isError } = useGetGifts()

  if (isLoading) return <Loader />

  console.log("gifts", gifts)

  return (
    <div>
      {gifts?.map((gift) => (
        <GiftCard />
      ))}
    </div>
  )
}

export default GiftPage
