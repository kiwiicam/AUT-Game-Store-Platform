import React, { useState } from 'react'
import "../css/GamecardNew.css"
function GamecardNew({ gameName, TeamName, gameImage, genres, size, release, likes }) {

    const [hover, setHover] = useState(false);

    return (
        <div className='outer-ncard' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {!hover ? <div className='inner-ncard'>
                <h3>{gameName}</h3>
                <h2>{TeamName}</h2>
                <div className='ncard-img'>
                    <img src={gameImage} alt='Game Cover' />
                </div>
                <div className='ncard-genres'>
                    {genres.map((genre, index) => (
                        <div key={index} className='ncard-genre'>
                            <p>{genre}</p>
                        </div>
                    ))}
                </div>
            </div>
                :
                <></>}

        </div >
    )
}

export default GamecardNew