import React, { useEffect, useState } from 'react'
import '../css/Homepage.css'
import Gamecard from '../components/Gamecard'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
function Homepage() {

    const [featuredGames, setFeaturedGames] = useState([]);
    const [recentReleases, setRecentReleases] = useState([]);
    const [index, setIndex] = useState(0);
    const [recentIndex, setRecentIndex] = useState(0);

    useEffect(() => {
        // This is where you can fetch data for the homepage, like featured games
        setFeaturedGames([
            { src: "https://i.redd.it/q4fjauk2ebc31.png", title: "Mincecraft", desc: "This will be a blurb description of the game based on what the user has written in their documents. It should provide a brief overview of the story, the game play, and additional features that make the game unique and interesting to play.", creator: "Mojang" },
            { src: "https://media.rockstargames.com/rockstargames/img/global/news/upload/1_gtavpc_03272015.jpg", title: "Grand Theft Auto 5", desc: "This is a description for Slideshow two.", creator: "Rockstar Games" },
            { src: "http://localhost:3000/joshgame.png", title: "Slideshow three", desc: "This is a description for Slideshow three.", creator: "Joshua Knight" },
        ]);
        setRecentReleases([
            { image: "https://i.redd.it/q4fjauk2ebc31.png", title: "Mincecraft LOL", creator: "Mojang" },
            { image: "https://media.rockstargames.com/rockstargames/img/global/news/upload/1_gtavpc_03272015.jpg", title: "GTA 5", creator: "Rockstar Games" },
            { image: "https://i.guim.co.uk/img/media/c15da9438dd16a3563e80b799f65554295b81769/40_0_1200_720/master/1200.jpg?width=700&quality=85&auto=format&fit=max&s=64f83bdbf0f8d4ce2f2bd2862f30a8cd", title: "Skyrim: The Elden Scrolls V", creator: "Bethesda Game Studios" },
            { image: "http://localhost:3000/joshgame.png", title: "Josh's game", creator: "Joshua Knight" },
            { image: "https://i.redd.it/q4fjauk2ebc31.png", title: "Mincecraft LOL", creator: "Mojang" },
            { image: "https://media.rockstargames.com/rockstargames/img/global/news/upload/1_gtavpc_03272015.jpg", title: "GTA 5", creator: "Rockstar Games" },
            { image: "https://i.guim.co.uk/img/media/c15da9438dd16a3563e80b799f65554295b81769/40_0_1200_720/master/1200.jpg?width=700&quality=85&auto=format&fit=max&s=64f83bdbf0f8d4ce2f2bd2862f30a8cd", title: "Skyrim: The Elden Scrolls V", creator: "Bethesda Game Studios" },
            { image: "http://localhost:3000/joshgame.png", title: "Josh's game", creator: "Joshua Knight" }
        ]);
    }, [])





    return (
        <div className='homepage-background'>
            <div className='homepage-content'>
                <div className='featured-games'>
                    <h1>Featured</h1>
                    <div className='split-line'></div>

                    <div className='featured-games-slider'>
                        <div className='button-left' onClick={() => setIndex(index === 0 ? 2 : index - 1)}><IoIosArrowBack /></div>

                        <div className="slideshow-container">
                            <div
                                className="slideshow-track"
                                style={{ transform: `translateX(-${index * (1 / 3) * 100}%)`, transition: 'transform 0.5s ease-in-out' }}
                            >
                                {featuredGames.map((game, i) => (
                                    <div key={i} className="slideshow-slide">
                                        <div className='slideshow-text-container'>
                                            <div className="vertical-line">
                                            </div>
                                            <div className="slideshow-text">
                                                <h2>{game.creator}</h2>
                                                <h3>{game.title}</h3>
                                                <p>{game.desc}</p>
                                            </div>
                                        </div>
                                        <img src={game.src} alt={`Featured game ${i + 1}`} className="slideshow-image" />
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className='button-right' onClick={() => setIndex(index === 2 ? 0 : index + 1)}><IoIosArrowForward /></div>
                        <div className='slideshow-indicators'><div className={`indicator ${index === 0 ? 'active' : ''}`}></div><div className={`indicator ${index === 1 ? 'active' : ''}`}></div><div className={`indicator ${index === 2 ? 'active' : ''}`}></div></div>
                    </div>

                </div>
                <div className='recent-releases'>
                    <h1>Recent student releases</h1>
                    <div className='split-line'></div>
                    <div className='recent-releases-slider'>
                        <div className='game-card-button-left' onClick={() => setRecentIndex(recentIndex === 0 ? 6 : recentIndex - 1)}><IoIosArrowBack /></div>                        <div className='game-cards'>
                            <div className='game-card-track'
                                style={{ transform: `translateX(-${recentIndex * (1 / 8) * 100}%)`, transition: 'transform 0.5s ease-in-out' }}

                            >
                                {recentReleases.map((game, i) => (
                                    <Gamecard key={i} image={game.image} title={game.title} creator={game.creator} />
                                ))}
                            </div>
                        </div>
                        {/*GONNA NEED SOME MAD CALCULATIONS FOR GETTING THIS TO WORK EVENLY */}
                        <div className='game-card-button-right' onClick={() => setRecentIndex(recentIndex === 6 ? 0 : recentIndex + 1)}><IoIosArrowForward /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage
