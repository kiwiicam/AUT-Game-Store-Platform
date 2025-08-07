import React from 'react'
import '../css/Gamecard.css'
function Gamecard({ image, title, creator, width }) {
  return (
    <div className='game-card' style={{ minWidth: width }}>
      <div className='game-img'>
        <img src={image} alt="Game Cover" />
      </div>
      <div className='game-info'>
        <h2>{creator}</h2>
        <h3>{title}</h3>
      </div>
    </div>
  )
}

export default Gamecard
