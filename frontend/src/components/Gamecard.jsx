import React from 'react'

function Gamecard({ image, title, creator }) {
  return (
    <div className='game-card'>
      <div className='game-img'>
        <img src={image} alt="Game Cover" />
      </div>
      <div className='game-info'>
        <h3>{creator}</h3>
        <h2>{title}</h2>
      </div>
    </div>
  )
}

export default Gamecard
