import React, { useState, useRef, useEffect } from 'react'
import "../css/GamecardNew.css";
import { useNavigate } from 'react-router';
import { BiSolidLike } from "react-icons/bi";
import axios from 'axios';

function GamecardNew({ gameName, TeamName, gameImage, genres, width, size, release, likes, slideid, setid }) {
    const [hover, setHover] = useState(false);
    const hoverTimeout = useRef(null);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(false);
    const navigate = useNavigate();

    const backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';


    const handleMouseEnter = () => {
        // Start a timeout
        hoverTimeout.current = setTimeout(() => {
            setHover(true);

            setTimeout(() => {
                setid(slideid);
            }, 500)
        }, 500);
    };

    const handleMouseLeave = () => {
        if (slideid === 7) {
            setid(6);
        }
        setHover(false);
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
            hoverTimeout.current = null;
        }
    };
    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const gameTrailer = await axios.post(`${backend_url}/storage/getgametrailer`, { gameName });
                if (gameTrailer.data.trailerUrl === "nothing") {
                    setVideo(false);
                    setTrailer(gameImage);
                }
                else {
                    setVideo(true);
                    setTrailer(gameTrailer.data.trailerUrl);
                }
            } catch (error) {
                alert("Error fetching trailer:", error.message);
            }
        }
        fetchTrailer();
    }, []);

    return (
        <div
            className='inner-ncard'
            id={hover ? 'inner-id' : ''}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ maxWidth: hover ? 1.58*width : width }}
            onClick={() => navigate(`/games/${gameName}`)}
        >
            {hover ? (
                <>
                    <div className='ncard-img-large'>
                        {video ?
                            <video src={trailer}
                                autoPlay
                                loop
                                muted
                            />
                            :
                            <img src={trailer} alt='Game Cover' />
                        }
                    </div>
                    <h3>{gameName}</h3>
                    <h2>{TeamName}</h2>
                    <div className='ncard-genres-hover'>
                        {genres.map((genre, index) => (
                            <div key={index} className='ncard-genre'>
                                <p>{genre}</p>
                                <div className="genre-icon">
                                    <img src={'http://localhost:3000/genre_icons/' + genre.toLowerCase().toString().replace(/\s+/g, '') + '.png'} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='align-ncard'>
                        <h2>File Size: {size}GB | Release Date: {release}</h2>
                        <div className='ncard-likes'>
                            <BiSolidLike style={{ fontSize: '1.8rem' }} /> <p>{likes}</p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h3>{gameName}</h3>
                    <h2>{TeamName}</h2>
                    <div className='ncard-img'>
                        <img src={gameImage} alt='Game Cover' />
                    </div>
                    <div className='ncard-genres'>
                        {genres.map((genre, index) => (
                            <div key={index} className='ncard-genre'>
                                <p style={{ fontSize: hover ? '0.9rem' : '0.7rem' }}>{genre}</p>
                            </div>
                            
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default GamecardNew;
