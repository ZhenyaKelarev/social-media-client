import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import "../rightBar.scss"
import "./style.scss"
import "../rightBar.scss"

import React from "react"

const CARD_LENGTH = 3

const SuggestionSkeleton = () => {
  return (
    <div className="suggestion-skeleton item">
      {[...Array(CARD_LENGTH).keys()].map((key, index) => (
        <div className="user">
          <div className="userInfo">
            <Skeleton className="skeleton-avatar" />
            <Skeleton className="skeleton-name" />
          </div>
          <div className="buttons">
            <Skeleton className="skeleton-button" />
            <Skeleton className="skeleton-button" />
          </div>
        </div>
      ))}
    </div>
  )
}

const SkeletonButton = () => {
  return <Skeleton className="skeleton-button" />
}

export { SuggestionSkeleton, SkeletonButton }
