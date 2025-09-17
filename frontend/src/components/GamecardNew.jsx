import React, { useState } from 'react'
import "../css/GamecardNew.css"
import { BiSolidLike } from "react-icons/bi";
function GamecardNew({ gameName, TeamName, gameImage, genres, width, size, release, likes, slideid, setid }) {

    const [hover, setHover] = useState(false);

    return (
        <div className='inner-ncard' id={hover ? 'inner-id' : ''} onMouseEnter={() => { setHover(true); setid(slideid) }} onMouseLeave={() => setHover(false)}>
            {hover ? <>
                <div className={hover ? 'ncard-img-large' : 'ncard-img'}>
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
            </> :
                <>
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
                </>}
        </div>

    )
}

export default GamecardNew