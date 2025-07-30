import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SlLike } from "react-icons/sl";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import '../css/Gamepage.css'


function Gamepage() {
    const [index, setIndex] = useState(0);
    const [gameImages, setGameImages] = useState([]);

    const { slug } = useParams();
    useEffect(() => {
        setGameImages([
            { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRG3XnK_SdDy6_T6EgnjEQvoI7koGkpP-R0g&s' },
            { src: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg' },
            { src: 'https://www.azcentral.com/gcdn/authoring/authoring-images/2024/11/19/USAT/76424170007-merlin-minecraft-image-2.jpg?crop=2149,1208,x0,y0&width=660&height=371&format=pjpg&auto=webps' }
        ]);
    }, []);
    return (
        <div className='gamepage-container'>
            <div className='gamepage-inner'>
                <div className='gamepage-header-container'>
                    <div className='gamepage-header'>
                        <h1>Minecraft</h1>
                        <h2>This is the page where the game information will be displayed</h2>
                    </div>
                    <div className='gamepage-likes'>
                        <p>462</p>
                        <div className='gamepage-like-icon'><SlLike /></div>
                    </div>
                </div>
                <div className='gamepage-info'>
                    <div className='gamepage-slider'>
                        <div className='gamepage-slider-top'>
                            <div className='gamepage-slider-track'
                                style={{ transform: `translateX(-${index * (1 / 3) * 100}%)`, transition: 'transform 0.5s ease-in-out' }}
                            >
                                {gameImages.map((game, i) => (
                                    <div key={i} className="gamepage-slideshow-slide">
                                        <img src={game.src} alt={slug} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='gamepage-slider-bottom'>
                            <div className='gamepage-slider-button-left' onClick={() => setIndex((index - 1 + gameImages.length) % gameImages.length)}><IoIosArrowBack style={{ margin: '0' }} /></div>
                            <div className='gamepage-slider-indicators'>
                                <div className={`gamepage-slider-indicator ${index === 0 ? 'active' : ''}`}> </div>
                                <div className={`gamepage-slider-indicator ${index === 1 ? 'active' : ''}`}> </div>
                                <div className={`gamepage-slider-indicator ${index === 2 ? 'active' : ''}`}> </div>
                            </div>
                            <div className='gamepage-slider-button-right' onClick={() => setIndex((index + 1) % gameImages.length)}><IoIosArrowForward style={{ margin: '0' }} /></div>
                        </div>

                    </div>
                    <div className='gamepage-sidebar'>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Gamepage
