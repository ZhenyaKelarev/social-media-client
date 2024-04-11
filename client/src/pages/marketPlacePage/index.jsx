import React from "react"
import { useGetCardCollection } from "queries/marketplace/queries"
import HeroCollectionCard from "./components/heroCollectionCard"
import Loader from "components/Loader"
import "./style.scss"

const MarketPlacePage = () => {
  const { data, isLoading, isError } = useGetCardCollection()

  console.log("data", data)

  if (isLoading) return <Loader />

  return (
    <div className="marketplace-page">
      <h1>MarketPlace</h1>
      <div className="card-collection">
        {data.map((card) => (
          <HeroCollectionCard cardData={card} />
        ))}
      </div>
    </div>
  )
}

export default MarketPlacePage
