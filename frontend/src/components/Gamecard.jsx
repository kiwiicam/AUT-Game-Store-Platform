import React from 'react'
import { useNavigate } from 'react-router';
import '../css/Gamecard.css'
function Gamecard({ image, title, creator, width }) {
  const navigate = useNavigate();
  return (
    <div className='game-card' style={{ maxWidth: width }} onClick={() => navigate(`/games/${title}`)}>
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
