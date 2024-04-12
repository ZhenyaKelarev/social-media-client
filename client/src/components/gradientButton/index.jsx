import React from "react"
import "./styles.scss"

const GradientButton = ({ handlerClick, text, disabled }) => {
  const handleClick = () => {
    handlerClick()
  }

  console.log("text", text, disabled)
  return (
    <button
      disabled={disabled}
      className={`gradient-btn ${disabled ? "disable-btn" : ""}`}
      onClick={handleClick}
    >
      <span className="gradient-span">{text}</span>
    </button>
  )
}

export default GradientButton
