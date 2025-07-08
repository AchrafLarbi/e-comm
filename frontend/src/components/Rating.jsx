import React from 'react'
import './rating.css'

function Rating({ value, text, color = 'gold' }) {
  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i}>
        <i
          style={{ color }}
          className={
            value >= i + 1
              ? 'fas fa-star'
              : value >= i + 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
    )
  }

  return (
    <div className="rating">
      {stars}
      {text && <span>{text}</span>}
    </div>
  )
}

export default Rating
