import React from 'react'
import { useNavigate } from 'react-router';
import '../css/Gamecard.css'

function Gamecard({ image, title, creator, width, variant = "default", rank }) {
  const navigate = useNavigate();

  return (
    <div
      className={`game-card ${variant}`}
      style={{ maxWidth: width }}
      onClick={() => navigate(`/games/${title}`)}
    >
      <div className='game-img'>
        <img src={image} alt="Game Cover" />
      </div>

      {/* Default card info */}
      {variant === "default" && (
        <div className='game-info'>
          <h2>{creator}</h2>
          <h3>{title}</h3>
        </div>
      )}

      {/* Ranking number overlay */}
      {variant === "ranking" && (
        <span className="game-rank">{rank}</span>
      )}
    </div>
  )
}

export default Gamecard
