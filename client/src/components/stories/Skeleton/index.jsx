import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import "./styles.scss"

import React from "react"

const CARD_LENGTH = 3

const StoriesSkeleton = () => {
  return (
    <div className="stories-skeleton item">
      <Skeleton className="skeleton-avatar" />
      <div className="stories">
        {[...Array(CARD_LENGTH).keys()].map((key, index) => (
          <Skeleton key={key} className="skeleton-story" />
        ))}
      </div>
    </div>
  )
}

export { StoriesSkeleton }
