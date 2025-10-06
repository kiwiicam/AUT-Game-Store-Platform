import React, { useState, useRef } from 'react'
import "../css/GamecardNew.css"
import "../css/Gamecard.css"
import { BiSolidLike } from "react-icons/bi";

function GamecardNew({ gameName, TeamName, gameImage, genres, width, size, release, likes, slideid, setid }) {
    const [hover, setHover] = useState(false);
    const hoverTimeout = useRef(null);

    const handleMouseEnter = () => {
        setHover(true);
        hoverTimeout.current = setTimeout(() => {
            setid(slideid);
        }, 500);
    };

    const handleMouseLeave = () => {
        setHover(false);
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
            hoverTimeout.current = null;
        }
    };

    return (
        <div
            className='inner-ncard'
            id={hover ? 'inner-id' : ''}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {hover ? (
                // --- Hover version (unchanged)
                <>
                    <div className='ncard-img-large'>
                        <img src={gameImage} alt='Game Cover' />
                    </div>
                    <h3>{gameName}</h3>
                    <h2>{TeamName}</h2>
                    <div className='ncard-genres-hover'>
                        {genres.map((genre, index) => (
                            <div key={index} className='ncard-genre'>
                                <p>{genre}</p>
                            </div>
                        ))}
                    </div>
                    <h2>File Size: {size}GB | Release Date: {release}</h2>
                    <div className='ncard-likes'>
                        <BiSolidLike style={{ fontSize: '2rem' }} /> <p>{likes}</p>
                    </div>
                </>
            ) : (
                // --- New non-hover version using gamecard.css
                <div className="game-card">
                    <div className="game-img">
                        <img src={gameImage} alt={`${gameName} cover`} />
                    </div>

                    <div className="game-info">
                        <h3>{gameName}</h3>
                        <h2>{TeamName}</h2>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GamecardNew;
